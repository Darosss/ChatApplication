import { NextFunction, Request, Response } from "express";

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session = null;
  res.send({ message: "Logout succes" });
};

export { logout };
