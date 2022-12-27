import { NextFunction, Response } from "express";
import { RequestUserAuth } from "@types";

import { User } from "@/models/user";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  const currUser = req.user;

  const user = await User.findById(currUser?.id);

  if (!user?.isBanned) {
    return next();
  } else {
    res
      .status(403)
      .send({ message: "You are banned", banDate: user.banExpiresDate });
  }
}
