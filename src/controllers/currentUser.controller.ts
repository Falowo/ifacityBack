import { Request, Response } from "express";
import { UserModel } from "../database/models";
export const getOrCreate = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  console.log({req});

  const { authUser } = req.body;

  try {
    let userDB = await UserModel.findOne({
      sub: authUser?.sub,
    });
    if (!userDB) {
      const user = new UserModel({ ...authUser });
      userDB = await user.save();
    }

    res.status(200).json(userDB);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
