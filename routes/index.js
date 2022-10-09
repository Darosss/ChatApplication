const express = require("express");
const router = express.Router();

const chatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const User = require("../models/user");

router.get("/", async function (req, res) {
  let messages = {},
    chatRooms,
    connectedUser;
  const limitMsgs = 300;
  connectedUser = await User.findById(req.session.passport.user._id).exec();

  const chatRoomFilter = {
    $or: [
      { createdBy: connectedUser.id },
      //if room created by user
      {
        availableRanges: { $in: connectedUser.ranges },
        //user has range that chatrom require
      },
      {
        allowedUsers: { $eq: connectedUser.id },
        //user is allowed in chatroom
      },
    ],
    $and: [
      {
        bannedUsers: { $ne: connectedUser.id },
        //user is not banned in chatroom
      },
    ],
  };

  chatRooms = await chatRoom.find(chatRoomFilter);
  //gets messages depens what rooms user sees
  for await (const chatRoom of chatRooms) {
    messages[chatRoom._id] = await Message.find({
      whereSent: chatRoom._id,
    })
      .sort({ createdAt: "desc" })
      .populate("sender")
      .limit(limitMsgs)
      .exec();
  }
  res.render("index", {
    chatRooms: chatRooms,
    messages: messages,
  });
});

module.exports = router;
