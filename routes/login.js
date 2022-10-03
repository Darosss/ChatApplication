const express = require("express");
const router = express.Router();
const User = require("../models/user");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const layoutAuth = require("./middlewares/layoutAuth");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", (req, res) => {
  res.render("login", { layout: layoutAuth(req) });
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
