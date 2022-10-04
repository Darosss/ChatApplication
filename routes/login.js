const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password === password) {
        return done(null, false);
      }
      return done(null, {
        _id: user._id,
        username: user.username,
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
router.get("/", (req, res) => {
  res.render("login", {});
});
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/profil",
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("Post");
  }
);
module.exports = router;
