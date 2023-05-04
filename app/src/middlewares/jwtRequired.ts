import { NextFunction, Response, Request } from "express";
import passport from "passport";
export const jwtRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};
