const express = require("express");
const router = express.Router();
const authenticateUser = require("./middlewares/authenticateUser");

router.post(
  "/",

  (req, res, next) => {
    if (req.user) res.send("You are already logged in");
    else return next();
  },
  authenticateUser,
  (req, res, next) => {
    console.log("Logged in as", req.user);

    res.status(200).send({ token: req.session.jwt, user: req.user });
  }
);

module.exports = router;
