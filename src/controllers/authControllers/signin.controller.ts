import { Request, Response } from "express";
// import { UserModel } from "../../database/models";

export const signin = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  console.log({ req });

  res.status(200).json({req});
  // try {
  //   const dbUser = await UserModel.findOne({
  //     sub: user.sub,
  //   });
  //   console.log({ dbUser });
  //   if (!dbUser) {
  //     res.status(400).send("invalid email...");
  //   } else {
  //     {
        
  //       res.status(200).json(dbUser);
  //     }
  //   }
  // } catch (error) {
  //   console.log("error catched");
  //   res.status(500).send(error.message);
  // }
};
