import passport from "passport";
import { NextFunction, Request, Response } from "express";

const getSession = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.send(false);
    } else {
      res.send(user);
    }

    return next();
  })(req, res);
};

export { getSession };
