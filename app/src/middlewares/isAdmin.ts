import { Response, NextFunction } from "express";
import isAdmin from "@/utils/isAdminUser";
import { RequestUserAuth } from "@types";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  if (userId)
    if (await isAdmin(userId)) {
      return next();
    } else {
      res.status(403).send({ message: "You do not have permission" });
    }
}
