const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, function (req, res) {
  User.findOne(
    { username: req.session.passport.user },
    function (err, foundUser) {
      res.render("profil", { userDetails: foundUser });
    }
  );
});

router.post("/", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log("err", err);
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
