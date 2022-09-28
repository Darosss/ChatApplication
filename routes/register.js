const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.register(
    new User({ username: username }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.render("/");
      });
    }
  );
});

module.exports = router;
