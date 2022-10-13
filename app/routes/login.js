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
      user.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        if (!isMatch) return done(null, false);
        return done(null, user);
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
// router.get("/", (req, res) => {
//   res.send({ test: ["TEST", "ADWADWA", "EWQEWQWQ"] });
// });
router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(req.body);
    console.log(err, user, info);
    if (err) throw err;
    if (!user) res.send("No user");
    else {
      req.logIn(user, (er) => {
        if (err) throw err;
        res.send("LOGGED ");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

module.exports = router;
