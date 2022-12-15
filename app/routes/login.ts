import express, { NextFunction, Request, Response } from "express";
import authenticateUser from "./middlewares/authenticateUser";

const router = express.Router();

router.post(
  "/",

  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) res.send("You are already logged in");
    else return next();
  },
  authenticateUser,
  (req: Request, res: Response) => {
    res.status(200).send({ token: req.session?.jwt, user: req.user });
  }
);

export default router;
