const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, async function (req, res) {
  let messages;
  const limitMsgs = 500;
  try {
    messages = [];
    messages = await Message.find({})
      .sort({ createdAt: "desc" })
      .limit(limitMsgs)
      .exec();
  } catch {
    messages = [];
  }
  res.render("index", {
    messages: messages,
  });
});

module.exports = router;
