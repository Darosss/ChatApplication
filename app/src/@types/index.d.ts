import { Request } from "express";
import { Document, Types } from "mongoose";

interface RequestUserAuth extends Request {
  user?: {
    id?: string | null;
  };
}

interface IMongooseError extends Error {
  name: string;
  message: string;
  stack?: string;
  code?: number | string;
  keyValue: { [any: string]: string };
  errors: { [any: string]: { [any: string] } };
  index: number;
  path?: string;
}

interface IChatRoom {
  _id: string;
  name: string;
  availableRanges: string[] | IRange;
  allowedUsers: string[] | UserWithoutPassword[];
  bannedUsers: string[] | UserWithoutPassword[];
  createdBy: string | UserWithoutPassword;
}

type IChatRoomDocument = IChatRoom & Document;

interface IMessage {
  _id: string;
  message: string;
  sender: string | IUser;
  sentTime: Date;
  whereSent: string | IChatRoom;
}

type IMessageDocument = IMessage & Document;

interface IRange {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: string | IUser;
}

type IRangeDocument = IRange & Document;

interface IUser {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  createdAt: Date;
  birthday: Date;
  ranges: string[] | IRange[];
  administrator: boolean;
  moderator: boolean;
  country: string;
  gender: string;
  nickColor: string;
  email: string;
  phoneNumber: string;
  isBanned: boolean;
  bannedDate: Date;
  banExpiresDate: Date;
  banReason: string;
}

interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserWithoutPassword = Omit<IUser, "password">;

type IUserDocument = IUser & UserMethods & Document;

interface IUserRoomsFilter {
  $or: [
    { createdBy: string },
    //if room created by user
    {
      availableRanges: { $in: string[] | IRange[] };
      //user has range that chatrom require
    },
    {
      allowedUsers: { $eq: string[] | IUser[] };
      //user is allowed in chatroom
    }
  ];
  $and: [
    {
      bannedUsers: { $ne: string[] | IUser[] };
      //user is not banned in chatroom
    }
  ];
}
