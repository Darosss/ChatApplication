import { Response } from "express";
import { IChatRoom, IMessage, RequestUserAuth } from "@types";
import { ChatRoom } from "@/models/chatRoom";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Types } from "mongoose";

interface IUserChatsFilter {
  $or: [
    { createdBy: string },
    //if room created by user
    {
      availableRanges: { $in: Types.ObjectId[] };
      //user has range that chatrom require
    },
    {
      allowedUsers: { $eq: string[] };
      //user is allowed in chatroom
    }
  ];
  $and: [
    {
      bannedUsers: { $ne: string[] };
      //user is not banned in chatroom
    }
  ];
}

const findUserAndMakeChatFilter = async (userId: string) => {
  let userChatsFilter: IUserChatsFilter;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) return null;

    userChatsFilter = {
      $or: [
        { createdBy: currentUser.id },
        //if room created by user
        {
          availableRanges: { $in: currentUser.ranges },
          //user has range that chatrom require
        },
        {
          allowedUsers: { $eq: currentUser.id },
          //user is allowed in chatroom
        },
      ],
      $and: [
        {
          bannedUsers: { $ne: currentUser.id },
          //user is not banned in chatroom
        },
      ],
    };

    return userChatsFilter;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const makeSetOfRoomsMessages = async (
  chatRoomsList: IChatRoom[],
  limitMessages: number
) => {
  const roomsMessages = new Map<string, IMessage[]>();
  for await (const currentChatRoom of chatRoomsList) {
    const roomMsgs = await Message.find({
      whereSent: currentChatRoom._id,
    })
      .sort({ createdAt: "desc" })
      .populate("sender", { id: 1, username: 1 })
      .populate("whereSent", { id: 1, name: 1 })
      .limit(limitMessages)
      .select({ __v: 0 })
      .exec();

    roomsMessages.set(currentChatRoom._id.toString(), roomMsgs);
  }

  return roomsMessages;
};

// @description         Get user's chat rooms
// @route               GET /api/v1/chats

const chatsList = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id as string;
  const limitMsgs = 300;

  const chatRoomFilter = await findUserAndMakeChatFilter(userId);
  if (!chatRoomFilter) {
    res.status(404).send({ message: "Couldnt find user roms" });
  } else {
    const chatRooms = await ChatRoom.find(chatRoomFilter);

    const roomMsgSet = await makeSetOfRoomsMessages(chatRooms, limitMsgs);

    res.send({ rooms: Array.from(roomMsgSet), userChatRooms: chatRooms });
  }
};

export { chatsList };
