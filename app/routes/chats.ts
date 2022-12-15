import express, { Response } from "express";
import { RequestUserAuth } from "../@types/types";

import { ChatRoom } from "../models/chatRoom";
import { Message, IMessage } from "../models/message";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async function (req: RequestUserAuth, res: Response) {
  const userId = req.user?.id;

  const limitMsgs = 300;

  // eslint-disable-next-line prefer-const
  let roomsMsgArr: { [key: string]: IMessage[] } = {};
  let chatRoomFilter;

  await User.findById(userId).then((user) => {
    if (!user) return;
    //string[]>([]);
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
      roomsMsgArr[selectedChatRoom._id as unknown as string] =
        await Message.find({
          whereSent: selectedChatRoom._id,
        })
          .sort({ createdAt: "desc" })
          .populate("sender")
          .populate("whereSent")
          .limit(limitMsgs)
          .exec();
    }

    res.send({ rooms: roomsMsgArr, userChatRooms: chatRooms });
  });
  //gets messages depens what rooms user sees
});

export default router;
