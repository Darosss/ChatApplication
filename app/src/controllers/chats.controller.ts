import { Response } from "express";
import { RequestUserAuth } from "@types";
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

// @description         Get user's chat rooms
// @route               GET /api/v1/chats
export const chatsList = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id as string;

  const chatRoomFilter = await findUserAndMakeChatFilter(userId);
  if (!chatRoomFilter) {
    res.status(404).send({ message: "Couldnt find user roms" });
  } else {
    const chatRooms = await ChatRoom.find(chatRoomFilter).select("id name");

    res.send({ userChatRooms: chatRooms });
  }
};

// @description         Get room messages by room id
// @route               GET /api/v1/chats/:roomId
export const getRoomsMessagesById = async (
  req: RequestUserAuth,
  res: Response
) => {
  const roomMsgs = await Message.find({
    whereSent: req.params.roomId,
  }).select({ __v: 0, whereSent: 0 });

  res.send({
    chatRoom: {
      id: req.params.roomId,
      messages: Array.from(roomMsgs),
    },
  });
};
