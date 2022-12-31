import { Request, Response } from "express";
import { ChatRoom } from "@/models/chatRoom";
import { IUserRoomsFilter, RequestUserAuth } from "@types";
import { User } from "@/models/user";
import { Message } from "@/models/message";

export const getListOfRooms = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;
  let usersChatRooms: string[];

  try {
    usersChatRooms = await ChatRoom.find({ createdBy: userId });

    res.send({ usersRooms: usersChatRooms });
  } catch (error) {
    console.log(error);
  }
};

export const createNewRoom = async (req: RequestUserAuth, res: Response) => {
  const createdBy = req.user;
  const name = req.body.roomName;
  const ranges = req.body.availableRanges;
  const room = new ChatRoom({
    name: name,
    availableRanges: ranges,
    allowedUsers: req.body.allowedUsers,
    bannedUsers: req.body.bannedUsers,
    createdBy: createdBy?.id,
  });
  try {
    await room.save();
    res.status(201).send({ message: "Room created succesfully!" });
  } catch (error) {
    res.status(400).send({ message: "Cannot create room!" });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const chatRoomEdit = await ChatRoom.findById(_id)
    .populate("availableRanges", "id name")
    .populate("allowedUsers", "id username")
    .populate("bannedUsers", "id username")
    .populate("createdBy", "id username")
    .select({ __v: 0 });

  res.send({
    chatRoom: chatRoomEdit,
  });
};

export const editRoomById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { roomName, availableRanges, allowedUsers, bannedUsers } = req.body;
  const update = {
    name: roomName,
    availableRanges: availableRanges,
    allowedUsers: allowedUsers,
    bannedUsers: bannedUsers,
  };

  try {
    await ChatRoom.findByIdAndUpdate(_id, update);

    res.send({ message: "Successfully edited room" });
  } catch (err) {
    res.send({ message: "Can't edit room" });
    console.log(err);
  }
};

export const deleteRoomById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const room = await ChatRoom.findById(_id);
  try {
    await room?.remove();
    res.status(201).send({ message: "Succesfully removed room" });
  } catch {
    res.status(403).send({ message: "Can't remove room" });
  }
};

const findUserAndMakeChatFilter = async (userId: string) => {
  let userChatsFilter: IUserRoomsFilter;
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

export const getListOfUsersRooms = async (
  req: RequestUserAuth,
  res: Response
) => {
  const userId = req.user?.id as string;

  const chatRoomFilter = await findUserAndMakeChatFilter(userId);
  if (!chatRoomFilter) {
    res.status(404).send({ message: "Couldnt find user roms" });
  } else {
    const chatRooms = await ChatRoom.find(chatRoomFilter).select("id name");

    res.send({ userChatRooms: chatRooms });
  }
  //empty
};
export const getRoomsMessagesById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const roomMsgs = await Message.find({
    whereSent: _id,
  }).select({ __v: 0, whereSent: 0 });

  res.send({
    chatRoom: {
      id: _id,
      messages: Array.from(roomMsgs),
    },
  });
};
