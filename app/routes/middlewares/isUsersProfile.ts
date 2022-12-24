import { Response, NextFunction } from "express";
import { RequestUserAuth } from "../../@types/types";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  if (req.params.userId === userId?.toString()) {
    return next();
  } else {
    res.status(403).send({ message: "You do not have permission" });
  }
}
