import { Request } from "express";
import { Document } from "mongoose";

interface RequestUserAuth extends Request {
  user?: {
    id?: string | null;
  };
}

interface MongooseError extends Error {
  name: string;
  message: string;
  stack?: string;
  code?: number | string;
  keyValue: { [any: string]: string };
  errors: { [any: string]: { [any: string] } };
  index: number;
  path?: string;
}

interface ChatRoomModel {
  _id: string;
  name: string;
  availableRanges: string[] | RangeModel;
  allowedUsers: string[] | UserWithoutPassword[];
  bannedUsers: string[] | UserWithoutPassword[];
  createdBy: string | UserWithoutPassword;
}

type ChatRoomDocument = ChatRoomModel & Document;

interface MessageModel {
  _id: string;
  message: string;
  sender: string | UserModel;
  sentTime: Date;
  whereSent: string | ChatRoomModel;
}

type MessageDocument = MessageModel & Document;

interface RangeModel {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: string | UserModel;
}

type RangeDocument = RangeModel & Document;

interface UserModel {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  createdAt: Date;
  birthday: Date;
  ranges: string[] | RangeModel[];
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

type UserWithoutPassword = Omit<UserModel, "password">;

type UserDocument = UserModel & UserMethods & Document;

interface UserRoomsFilter {
  $or: [
    { createdBy: string },
    //if room created by user
    {
      availableRanges: { $in: string[] | RangeModel[] };
      //user has range that chatrom require
    },
    {
      allowedUsers: { $eq: string[] | UserModel[] };
      //user is allowed in chatroom
    }
  ];
  $and: [
    {
      bannedUsers: { $ne: string[] | UserModel[] };
      //user is not banned in chatroom
    }
  ];
}
