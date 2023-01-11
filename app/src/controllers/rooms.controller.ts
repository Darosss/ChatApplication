import { NextFunction, Request, Response } from "express";
import { ChatRoom } from "@/models/chatRoom";
import { IChatRoom, IMongooseError, RequestUserAuth } from "@types";
import { Message } from "@/models/message";
import makeUserChatFilter from "@/utils/makeUserChatFilter";
import errorHandlerMiddleware from "@/middlewares/errorHandler.middleware";

export const getListOfRooms = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;
  let usersChatRooms: IChatRoom[];

  try {
    usersChatRooms = await ChatRoom.find({ createdBy: userId })
      .select({
        __v: 0,
      })
      .exec();

    res.send({ usersRooms: usersChatRooms });
  } catch (error) {
    res.send({ message: "Couldn't get list of rooms, try again later" });
  }
};

export const createNewRoom = async (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) => {
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
    return next(
      errorHandlerMiddleware(error as IMongooseError, req, res, next)
    );
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

export const editRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.params;
  const { roomName, availableRanges, allowedUsers, bannedUsers } = req.body;
  const optionsUpdate = { runValidators: true };

  const update = {
    name: roomName,
    availableRanges: availableRanges,
    allowedUsers: allowedUsers,
    bannedUsers: bannedUsers,
  };

  try {
    await ChatRoom.findByIdAndUpdate(_id, update, optionsUpdate);
    res.send({ message: "Successfully edited room" });
  } catch (error) {
    return next(
      errorHandlerMiddleware(error as IMongooseError, req, res, next)
    );
  }
};

export const deleteRoomById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const room = await ChatRoom.findById(_id);
  try {
    await room?.remove();
    res.status(201).send({ message: "Succesfully removed room" });
  } catch {
    res.status(403).send({ message: "Couldnt't remove room, try again later" });
  }
};

export const getListOfUsersRooms = async (
  req: RequestUserAuth,
  res: Response
) => {
  const userId = req.user?.id as string;

  const chatRoomFilter = await makeUserChatFilter(userId);
  if (!chatRoomFilter) {
    res.status(404).send({ message: "Couldnt find user roms" });
  } else {
    const chatRooms = await ChatRoom.find(chatRoomFilter).select("id name");

    res.send({ userChatRooms: chatRooms });
  }
};

export const getRoomsMessagesById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const roomMsgs = await Message.find({
    whereSent: _id,
  })
    .populate("sender", { id: 1, username: 1 })
    .select({ __v: 0, whereSent: 0 });

  res.send({
    chatRoom: {
      id: _id,
      messages: Array.from(roomMsgs),
    },
  });
};
