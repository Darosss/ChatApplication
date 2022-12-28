import { Request, Response } from "express";
import { ChatRoom } from "@/models/chatRoom";
import { User } from "@/models/user";
import { Range } from "@/models/range";
import { RequestUserAuth } from "@types";

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
  const ranges = await Range.find({}, "_id name");

  const users = await User.find({}, "_id username");
  const chatRoomEdit = await ChatRoom.findById(req.params.roomId);
  res.send({
    chatRoom: chatRoomEdit,
    availableRanges: ranges,
    usersList: users,
  });
};

export const editRoomById = async (req: Request, res: Response) => {
  const roomIdParam = req.params.roomId;
  const update = {
    name: req.body.roomName,
    availableRanges: req.body.availableRanges,
    allowedUsers: req.body.allowedUsers,
    bannedUsers: req.body.bannedUsers,
  };
  try {
    await ChatRoom.findByIdAndUpdate(roomIdParam, update).then(() => {
      res.send({ message: "Successfully edited room" });
    });
  } catch (err) {
    res.send({ message: "Can't edit room" });
    console.log(err);
  }
};

export const deleteRoomById = async (req: Request, res: Response) => {
  const room = await ChatRoom.findById(req.params.roomId);
  try {
    await room?.remove();
    res.status(201).send({ message: "Succesfully removed room" });
  } catch {
    res.status(403).send({ message: "Can't remove room" });
  }
};
