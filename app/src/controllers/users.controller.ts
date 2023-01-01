import { NextFunction, Request, Response } from "express";
import { User } from "@/models/user";
import { ChatRoom } from "@/models/chatRoom";
import errorHandlerMiddleware from "@/middlewares/errorHandler.middleware";
import { IMongooseError } from "@types";

export const getListOfUsers = async (req: Request, res: Response) => {
  let users;
  try {
    users = await User.find({}, { password: 0, __v: 0 });
    res.send({ usersList: users });
  } catch {
    res.send({ message: "Can't get users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const selectedUser = await User.findById(_id, {
    password: 0,
    __v: 0,
  }).populate("ranges", "id name");
  res.send({
    user: selectedUser,
  });
};

export const getUsersRoomsById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const chatRooms = await ChatRoom.find({ createdBy: _id });

  res.send({ chatRooms: chatRooms });
};

export const editUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.params;

  const {
    username,
    firstname,
    surname,
    country,
    gender,
    nickColor,
    email,
    phoneNumber,
    ranges,
  } = req.body;

  const optionsUpdate = { runValidators: true };
  const update = {
    username: username,
    firstname: firstname,
    surname: surname,
    country: country,
    gender: gender,
    nickColor: nickColor,
    email: email,
    phoneNumber: phoneNumber,
    ranges: ranges,
  };

  try {
    await User.findByIdAndUpdate(_id, update, optionsUpdate);
    res.send({ message: "User edited" });
  } catch (error) {
    return next(
      errorHandlerMiddleware(error as IMongooseError, req, res, next)
    );
  }
};

export const banUserById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const banTime = req.body.banTime || 5;
  const banReason = req.body.banReason;

  const bannedDate = new Date(),
    banExpiresDate = new Date();
  const banMinutes = banExpiresDate.getMinutes() + parseInt(banTime);
  banExpiresDate.setMinutes(banMinutes);

  const update = {
    isBanned: true,
    bannedDate: bannedDate,
    banExpiresDate: banExpiresDate,
    banReason: banReason,
  };
  try {
    await User.findByIdAndUpdate(_id, update);
    res.send({ message: "User banned" });
  } catch (e) {
    res.send({ message: "User can't be banned" });
  }
};

export const unbanUserById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const update = {
    isBanned: false,
  };
  try {
    await User.findByIdAndUpdate(_id, update);
    res.send({ message: "User unbanned" });
  } catch (e) {
    res.send({ message: "User can't be unbanned" });
  }
};
