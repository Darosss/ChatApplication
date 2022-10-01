const express = require("express");
const router = express.Router();

const chatRoom = require("../models/chatRoom");
const Message = require("../models/message");

const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, async function (req, res) {
  let messages, chatRooms;
  const limitMsgs = 500;
  try {
    chatRooms = await chatRoom.find({});
    messages = await Message.find({})
      .sort({ createdAt: "desc" })
      .limit(limitMsgs)
      .exec();
  } catch {
    (messages = []), (chatRooms = []);
  }

  res.render("index", {
    chatRooms: chatRooms,
    messages: messages,
  });
});

module.exports = router;
