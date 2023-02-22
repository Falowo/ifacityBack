import express, { Request, Response } from "express";
const router = express.Router();
import {
  ConversationModel,
  MessageModel,
  UserModel,
} from "../../database/models";
import { User } from "../../database/models/User";
import fs from "fs-extra";
import path from "path";

router.get("/req", async (req, res) => {
  console.log(req);
  res.status(200).json(req);
});

//delete user
router.delete(
  "/:id",
  async (req: Request, res: Response) => {
    if (
      req.body.userId === req.params.id ||
      req.body.isAdmin
    ) {
      try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(403)
        .json("You can delete only your account!");
    }
  },
);

//get a user by query
router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    const { updatedAt, ...other } = user;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users matching search

router.get(
  "/search/:search",
  async (req: Request, res: Response) => {
    const search = req.params.search;
    const currentUserId = req.body;
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[]\]/g, "$&");
    }
    const escapedSearch = escapeRegExp(search);
    const regExp = `^${escapedSearch}`;
    const reg = new RegExp(regExp, "ig");

    try {
      const users: User[] = await UserModel.find({
        username: { $regex: reg },
      });

      const lightUsers = users
        .map((u) => {
          const { _id, username, profilePicture } = u;
          return { _id, username, profilePicture };
        })
        .filter(
          (l) =>
            l._id.toString() !== currentUserId.toString(),
        );

      res.status(200).json(lightUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

//get friends
router.get(
  "/best/currentUser/friends",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    try {
      const conversations = await ConversationModel.find(
        {
          $and: [
            { membersId: { $in: [currentUserId] } },
            { membersId: { $size: 2 } },
          ],
        },
        "membersId _id",
      ).sort({ updatedAt: -1 });

      const conversationAndUser: {
        conversationId: string;
        memberId: string;
      }[] = conversations.flatMap((c) => ({
        memberId: c.membersId
          .map((mId) => mId.toString())
          .filter(
            (mId) => mId !== currentUserId.toString(),
          )[0],
        conversationId: c._id,
      }));

      const friendsAndMessagesNumber: {
        friendId: string;
        numberOfMessages: number;
      }[] = await Promise.all(
        conversationAndUser.map(async (c) => {
          const numberOfMessages = await MessageModel.find({
            conversationId: c.conversationId,
          }).count();

          return { friendId: c.memberId, numberOfMessages };
        }),
      );
      friendsAndMessagesNumber.sort((a, b) => {
        return b.numberOfMessages - a.numberOfMessages;
      });

      res.status(200).json(friendsAndMessagesNumber);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

//get friends
router.get(
  "/friends/:userId",
  async (req: Request, res: Response) => {
    try {
      const user: User = await UserModel.findById(
        req.params.userId,
      );

      const friends = await Promise.all(
        user.friends?.map((friendId) =>
          UserModel.findById(
            friendId,
            "_id username profilePicture",
          ),
        ),
      );

      res.status(200).json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

//get followedUsers
router.get(
  "/followedUsers/:id",
  async (req: Request, res: Response) => {
    try {
      const user: User = await UserModel.findById(
        req.params.id,
      );

      const followedIds = user.followedIds;

      const friends = await Promise.all(
        followedIds?.map((friendId) =>
          UserModel.findById(
            friendId,
            "_id username profilePicture",
          ),
        ),
      );
      res.status(200).json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);
//get followers
router.get(
  "/followers/:userId",
  async (req: Request, res: Response) => {
    try {
      const user: User = await UserModel.findById(
        req.params.userId,
      );

      const followersIds = user.followersIds;

      const friends = await Promise.all(
        followersIds?.map((friendId) =>
          UserModel.findById(
            friendId,
            "_id username profilePicture",
          ),
        ),
      );

      res.status(200).json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

//follow a user

router.put(
  "/:id/follow",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    if (
      currentUserId.toString() !== req.params.id.toString()
    ) {
      try {
        let user = await UserModel.findById(req.params.id);
        let currentUser = await UserModel.findById(
          currentUserId,
        );
        if (
          !user.followersIds
            .map((f) => f.toString())
            .includes(currentUserId.toString())
        ) {
          if (
            currentUser.followersIds
              .map((f) => f.toString())
              .includes(user._id.toString()) &&
            !currentUser.friends
              .map((f) => f.toString())
              .includes(user._id.toString())
          ) {
            user = await UserModel.findByIdAndUpdate(
              user._id,
              {
                $push: {
                  followersIds: currentUserId,
                  friends: currentUserId,
                },
                $pull: {
                  friendRequestsFrom: currentUserId,
                  friendRequestsTo: currentUserId,
                  notCheckedFriendRequestsFrom:
                    currentUserId,
                },
              },
              { new: true },
            );
            currentUser = await UserModel.findByIdAndUpdate(
              currentUser._id,
              {
                $push: {
                  followedIds: req.params.id,
                  friends: req.params.id,
                },
                $pull: {
                  friendRequestsFrom: req.params.id,
                  friendRequestsTo: req.params.id,
                  notCheckedFriendRequestsFrom:
                    req.params.id,
                },
              },
              { new: true },
            );
          } else {
            user = await UserModel.findByIdAndUpdate(
              user._id,
              {
                $push: { followersIds: currentUserId },
              },
            );
            currentUser = await UserModel.findByIdAndUpdate(
              currentUser.id,
              {
                $push: { followedIds: req.params.id },
              },
            );
          }

          res.status(200).json({ user, currentUser });
        } else {
          res
            .status(403)
            .json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  },
);

//unfollow a user

router.put(
  "/:id/unfollow",
  async (req: Request, res: Response) => {
    const currentUserId = req.body.currentUserId;
    if (
      currentUserId.toString() !== req.params.id.toString()
    ) {
      try {
        let user = await UserModel.findById(req.params.id);
        let currentUser = await UserModel.findById(
          currentUserId,
        );
        if (
          user.followersIds
            .map((f) => f.toString())
            .includes(currentUserId.toString())
        ) {
          user = await UserModel.findByIdAndUpdate(
            user._id,
            {
              $pull: { followersIds: currentUserId },
            },
            { new: true },
          );
          currentUser = await UserModel.findByIdAndUpdate(
            currentUser._id,
            {
              $pull: { followedIds: req.params.id },
            },
            { new: true },
          );
          res.status(200).json({ user, currentUser });
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  },
);

// get friendsrequestsFrom

router.get(
  "/friend/requests/from",
  async (req: Request, res: Response) => {
    const currentUserId = req.body.currentUserId;
    const currentUser = await UserModel.findById(
      currentUserId,
    );
    try {
      const users = await Promise.all(
        currentUser.friendRequestsFrom?.map(async (fId) => {
          const f = await UserModel.findById(fId);
          const { _id, username, profilePicture } = f;
          return {
            _id,
            username,
            profilePicture,
          };
        }),
      );
      console.log({ friendRequestFrom: users });

      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
);

// send or accept friend request

router.put(
  "/:id/friendRequest",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    // if the friend is not same as currentUser
    if (
      currentUserId.toString() !== req.params.id.toString()
    ) {
      try {
        let user = await UserModel.findById(req.params.id);
        let currentUser = await UserModel.findById(
          currentUserId,
        );
        // if the user has not already been requested  as friend && user is not already friend
        if (
          !currentUser.friendRequestsTo
            .map((f) => f.toString())
            .includes(user?._id!.toString()) &&
          !currentUser.friends
            .map((f) => f.toString())
            .includes(user?._id!.toString())
        ) {
          console.log(
            "the_user_has_not_already_been_requested_as_friend_&&_user_is_not__already_friend",
          );

          // if the user had send friendRequest to currentUser before
          if (
            currentUser.friendRequestsFrom
              .map((f) => f.toString())
              .includes(user._id.toString())
          ) {
            console.log(
              "the_user_had send__friendRequest__to___currentUser___before",
            );

            user = await UserModel.findOneAndUpdate(
              { _id: user._id },
              {
                $push: {
                  friends: currentUser._id,
                  notCheckedAcceptedFriendRequestsBy:
                    currentUser._id,
                },
                $pull: {
                  friendRequestsTo: currentUser._id,
                },
              },

              { new: true },
            );

            currentUser = await UserModel.findOneAndUpdate(
              { _id: currentUser._id },
              {
                $push: { friends: req.params.id },
                $pull: {
                  friendRequestsFrom: req.params.id,
                  notCheckedFriendRequestsFrom:
                    req.params.id,
                },
              },
              { new: true },
            );
            console.log({ currentUser });
          } else {
            // just send friend request
            user = await UserModel.findOneAndUpdate(
              { _id: user._id },
              {
                $push: {
                  friendRequestsFrom: currentUserId,
                  notCheckedFriendRequestsFrom:
                    currentUserId,
                },
              },
              { new: true },
            );
            currentUser = await UserModel.findOneAndUpdate(
              { _id: currentUser._id },
              {
                $push: {
                  friendRequestsTo: req.params.id,
                },
              },
              { new: true },
            );
          }

          res.status(200).json({ user, currentUser });
        } else {
          res
            .status(403)
            .json(
              `you already sent friend request to ${user.username}`,
            );
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(403)
        .json(`you can't send friend request to yourself`);
    }
  },
);

// checkFriendRequests
router.put(
  "/currentUser/checkFriendRequests",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    try {
      const updatedCurrentUser =
        await UserModel.findByIdAndUpdate(
          currentUserId,
          { notCheckedFriendRequestsFrom: [] },
          { new: true },
        );
      res.status(200).json(updatedCurrentUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
);
// checkAcceptedFriendRequests
router.put(
  "/currentUser/checkAcceptedFriendRequests",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    try {
      const updatedCurrentUser =
        await UserModel.findByIdAndUpdate(
          currentUserId,
          { notCheckedAcceptedFriendRequestsBy: [] },
          { new: true },
        );
      res.status(200).json(updatedCurrentUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
);

// addFriend

router.put(
  "/:id/addFriend",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;
    if (
      currentUserId.toString() !== req.params.id.toString()
    ) {
      try {
        const userId = req.params.id;
        let currentUser = await UserModel.findById(
          currentUserId,
        );
        if (
          !currentUser.friends
            .map((f) => f.toString())
            .includes(userId)
        ) {
          currentUser = await UserModel.findByIdAndUpdate(
            currentUser._id,
            {
              $push: {
                friends: userId,
                followedIds: userId,
              },
              $pull: {
                friendRequestsFrom: userId,
                notCheckedFriendRequestsFrom: userId,
                friendRequestsTo: userId,
              },
            },
            { new: true },
          );

          res.status(200).json(currentUser);
        } else {
          res
            .status(403)
            .json("you allready friend this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant friend yourself");
    }
  },
);

// edit profile picture
router.put(
  "/currentUser/editProfilePicture",
  async (req: Request, res: Response) => {
    const { fileName, currentUserId } = req.body;

    try {
      let currentUser = await UserModel.findById(
        currentUserId,
      );

      const oldFileName = currentUser.profilePicture;

      currentUser = await UserModel.findByIdAndUpdate(
        currentUser._id,
        {
          profilePicture: fileName,
        },
        { new: true },
      );

      await fs.remove(
        path.join(
          __dirname,
          `../../public/images/${oldFileName}`,
        ),
      );
      console.log({ oldFileName });

      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);
// edit cover picture
router.put(
  "/currentUser/editCoverPicture",
  async (req: Request, res: Response) => {
    const { fileName, currentUserId } = req.body;

    try {
      let currentUser = await UserModel.findById(
        currentUserId,
      );

      const oldFileName = currentUser.coverPicture;

      currentUser = await UserModel.findByIdAndUpdate(
        currentUser._id,
        {
          coverPicture: fileName,
        },
        { new: true },
      );

      !!oldFileName &&
        (await fs.remove(
          path.join(
            __dirname,
            `../../public/images/${oldFileName}`,
          ),
        ));
      console.log({ oldFileName });

      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);
// update currentUser info
router.put(
  "/currentUser/updateInfo",
  async (req: Request, res: Response) => {
    const { city, from, relationship } =
      req.body.toUpdateUserInfo;
    const { currentUserId } = req.body;
    try {
      let currentUser = await UserModel.findById(
        currentUserId,
      );

      currentUser = await UserModel.findByIdAndUpdate(
        currentUser._id,
        {
          city,
          from,
          relationship,
        },
        { new: true },
      );

      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

// update currentUser desc
router.put(
  "/currentUser/updateDesc",
  async (req: Request, res: Response) => {
    const { currentUserId } = req.body;

    const { desc } = req.body.toUpdateUserDesc;

    try {
      let currentUser = await UserModel.findById(
        currentUserId,
      );

      currentUser = await UserModel.findByIdAndUpdate(
        currentUser._id,
        {
          desc,
        },
        { new: true },
      );

      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

export default router;
