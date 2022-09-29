const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", isLoggedIn, async function (req, res) {
  let messages;

  try {
    messages = [];
    messages = await Message.find({})
      .sort({ createdAt: "desc" })
      .limit(15)
      .exec();
  } catch {
    messages = [];
  }
  res.render("index", {
    username: req.session.passport.user,
    messages: messages,
  });
});
function isLoggedIn(req, res, next) {
  console.log("IS LOGGED IN", req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}

module.exports = router;
