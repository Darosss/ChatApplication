import { Response } from "express";
import { RequestUserAuth } from "@types";

const login = (req: RequestUserAuth, res: Response) => {
  if (req.user) res.send("You are already logged in");
  else {
    res.status(200).send({ token: req.session?.jwt, user: req.user });
  }
};

export { login };
