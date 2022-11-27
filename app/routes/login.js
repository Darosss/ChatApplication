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
    res.cookie("token", req.session.jwt, {
      domain: "onrender.com",
      secure: true,
      sameSite: "none",
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    console.log(req.session);
    console.log(res.getHeaders(), "headers");
    res.status(200).send({ token: req.session.jwt, user: req.user });
  }
);

module.exports = router;
