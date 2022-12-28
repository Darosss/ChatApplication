import { RequestUserAuth } from "@types";
import { NextFunction, Response } from "express";

const isLoggedIn = (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.status(200).json({ message: "You are already logged in" });
  } else {
    return next();
  }
};

export default isLoggedIn;
