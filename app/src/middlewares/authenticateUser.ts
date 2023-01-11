import passport from "passport";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user)
      return res
        .status(200)
        .send({ message: "Username or password does not match" });

    req.logIn(user, (error) => {
      if (error) throw error;
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_KEY must be defined");
      }

      if (user) {
        const userReturnObject = {
          username: user.username,
        };
        req.session = {};
        req.session.jwt = jwt.sign(
          userReturnObject,
          process.env.JWT_SECRET_KEY,
          { expiresIn: 86400 }
        );
        next();
      }
    });
  })(req, res, next);
}
