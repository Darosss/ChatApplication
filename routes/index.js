const express = require("express");
const router = express.Router();

const chatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const User = require("../models/user");
const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, async function (req, res) {
  let messages = {},
    chatRooms,
    connectedUser;
  const limitMsgs = 300;

  try {
    connectedUser = await User.findOne({
      username: req.session.passport.user,
    });
    const chatRoomFilter = {
      $or: [
        { createdBy: connectedUser.username },
        {
          availableRanges: { $in: connectedUser.range },
        },
        { availableRanges: { $all: connectedUser.username } },
      ],
    };
    chatRooms = await chatRoom.find(chatRoomFilter);
    //gets messages depens what rooms user sees
    for await (const chatRoom of chatRooms) {
      messages[chatRoom._id] = await Message.find({
        whereSent: chatRoom._id,
      })
        .sort({ createdAt: "desc" })
        .limit(limitMsgs)
        .exec();
    }
  } catch {
    chatRooms = [];
  }
  res.render("index", {
    chatRooms: chatRooms,
    messages: messages,
  });
});

module.exports = router;
