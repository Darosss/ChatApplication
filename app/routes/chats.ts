import express, { Response } from "express";
import { RequestUserAuth } from "../@types/types";

import { ChatRoom } from "../models/chatRoom";
import { Message, IMessage } from "../models/message";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async function (req: RequestUserAuth, res: Response) {
  const userId = req.user?.id;
  const limitMsgs = 300;

  const roomMsgSet = new Map<string, IMessage[]>();
  let chatRoomFilter;

  await User.findById(userId).then((user) => {
    if (!user) return;
    chatRoomFilter = {
      $or: [
        { createdBy: user.id },
        //if room created by user
        {
          availableRanges: { $in: user.ranges },
          //user has range that chatrom require
        },
        {
          allowedUsers: { $eq: user.id },
          //user is allowed in chatroom
        },
      ],
      $and: [
        {
          bannedUsers: { $ne: user.id },
          //user is not banned in chatroom
        },
      ],
    };
  });

  await ChatRoom.find(chatRoomFilter).then(async (chatRooms) => {
    for await (const selectedChatRoom of chatRooms) {
      const roomMsgs = await Message.find({
        whereSent: selectedChatRoom._id,
      })
        .sort({ createdAt: "desc" })
        .populate("sender", { id: 1, username: 1 })
        .populate("whereSent", { id: 1, name: 1 })
        .limit(limitMsgs)
        .select({ __v: 0 })
        .exec();

      roomMsgSet.set(selectedChatRoom._id.toString(), roomMsgs);
    }
    res.send({ rooms: Array.from(roomMsgSet), userChatRooms: chatRooms });
  });
});

export default router;
