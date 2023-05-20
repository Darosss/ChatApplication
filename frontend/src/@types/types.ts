export interface IAuth {
  id: string;
  username: string;
  exp: number;
  iat: number;
  administrator?: boolean;
  isBanned?: boolean;
}
export interface IChatRoomRes {
  _id: string;
  name: string;
  availableRanges: string[];
  allowedUsers: string[];
  bannedUsers: string[];
  createdBy: string;
}

export type RoomUpdateData = Omit<IChatRoomRes, "_id" | "createdBy">;

export interface IUserRes {
  _id: string;
  username: string;
  firstname?: string;
  surname?: string;
  email: string;
  birthday: Date;
  createdAt: Date;
  country?: string;
  gender?: string;
  phone?: string;
  nickColor?: string;
  isBanned: boolean;
  bannedDate?: Date;
  banExpiresDate?: Date;
  banReason?: string;
  ranges: IRangeRes[] | string[];
}

export interface UserUpdateData
  extends Pick<
    IUserRes,
    "username" | "firstname" | "surname" | "birthday" | "country" | "gender" | "nickColor" | "email" | "phone"
  > {
  ranges: string[];
}

export interface UserRegisterData extends Omit<UserUpdateData, "ranges"> {
  password: string;
  birthday: Date;
  username: string;
}

export interface LoggedUserUpdateData extends Omit<UserUpdateData, "ranges" | "username"> {
  oldPassword?: string;
  newPassword?: string;
  birthday: Date;
}

export interface LoginFields {
  username: string;
  password: string;
}

export interface UserBanData {
  banTime: number;
  banReason: string;
}
export interface IMessagesRes {
  _id: string;
  roomId: string;
  whereSent: IChatRoomRes;
  message: string;
  sentTime: Date;
  sender: IUserRes;
}

export interface IRangeRes {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: IUserRes;
}

export type RangeUpdateData = Pick<IRangeRes, "name">;
