import { Request } from "express";
import { Document, Types } from "mongoose";

interface RequestUserAuth extends Request {
  user?: {
    id?: string;
  };
}

interface IChatRoom {
  _id: Types.ObjectId;
  name: string;
  availableRanges: Types.ObjectId[];
  allowedUsers: Types.ObjectId[];
  bannedUsers: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

type IChatRoomDocument = IChatRoom & Document;

interface IMessage {
  _id: string;
  message: string;
  sender: Types.ObjectId;
  sentTime: Date;
  whereSent: Types.ObjectId;
}

type IMessageDocument = IMessage & Document;

interface IRange {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: Types.ObjectId;
}

type IRangeDocument = IRange & Document;

interface IUser {
  comparePassword(password: string, cb: Callback): boolean;
  _id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  createdAt: Date;
  birthday: Date;
  ranges: Types.ObjectId[];
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

type IUserDocument = IUser & Document;

interface IUserRoomsFilter {
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
