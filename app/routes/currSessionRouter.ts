import express, { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("nodeenv", process.env.NODE_ENV);
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.send(false);
    } else {
      res.send(user);
    }
  })(req, res);
});

export default router;
