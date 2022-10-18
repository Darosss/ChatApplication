const express = require("express");
const router = express.Router();

const chatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const User = require("../models/user");

router.get("/", async function (req, res) {
  const userId = req.user.id;
  let roomsMsgArr = {},
    chatRooms,
    connectedUser;
  const limitMsgs = 300;
  connectedUser = await User.findById(userId).exec();
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
  console.log("test", chatRooms);
  //gets messages depens what rooms user sees
  for await (const chatRoom of chatRooms) {
    roomsMsgArr[chatRoom._id] = await Message.find({
      whereSent: chatRoom._id,
    })
      .sort({ createdAt: "desc" })
      .populate("sender")
      .populate("whereSent")
      .limit(limitMsgs)
      .exec();
  }

  res.send({ rooms: roomsMsgArr, userChatRooms: chatRooms });
});

module.exports = router;
