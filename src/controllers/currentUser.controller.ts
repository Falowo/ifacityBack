import { Request, Response } from "express";
import { UserModel } from "../database/models";
export const getOrCreate = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  const { authUser } = req.body;

  try {
    let user = await UserModel.findOne({
      sub: authUser?.sub,
    });
    if (!user) {
      user = await authUser.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
