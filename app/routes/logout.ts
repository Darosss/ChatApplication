import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session = null;
  res.send({ message: "Logout succes" });
});

export default router;
