import { Response, NextFunction } from "express";
import { User } from "@/models/user";
import { RequestUserAuth } from "@types";
import { UserDocument } from "@types";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  if (req.user === undefined) return next();
  else {
    const currUser = req.user?.id;
    const loggedUser = (await User.findById(currUser)) as UserDocument;
    if (checkBanDate(loggedUser.banExpiresDate)) await unban(loggedUser);

    return next();
  }
}

const unban = async function (user: UserDocument) {
  user.isBanned = false;
  try {
    await user.save();
  } catch (err) {
    console.log("unban error", err);
  }
};

const checkBanDate = function (banDate: Date) {
  if (Number(banDate) - Number(new Date()) <= 0) return true;
};
