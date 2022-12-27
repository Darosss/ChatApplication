import { Response } from "express";
import { RequestUserAuth } from "@types";

const login = (req: RequestUserAuth, res: Response) => {
  res.status(200).send({ token: req.session?.jwt, user: req.user });
};

export { login };
