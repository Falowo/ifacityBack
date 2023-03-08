import { Request, Response } from "express";

export const single = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  const { body, file } = req;
  console.log({ body, file });

  try {
    res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
};
export const arrayImages = async (
  req: Request,
  res: Response,
  // next: NextFunction,
) => {
  const { body, files } = req;
  console.log({ body, files });

  try {
    res.status(200).json("Files uploded successfully");
  } catch (error) {
    console.error(error);
  }
};
