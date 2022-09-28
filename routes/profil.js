const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", isLoggedIn, function (req, res) {
  res.render("profil", { username: req.session.passport.user });

  console.log(req.session.passport);
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
function isLoggedIn(req, res, next) {
  console.log("IS LOGGED IN", req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}
module.exports = router;
