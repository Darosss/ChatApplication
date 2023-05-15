interface IAuth {
  id: string;
  username: string;
  exp: number;
  iat: number;
  administrator?: boolean;
  isBanned?: boolean;
}
interface IChatRoomRes {
  _id: string;
  name: string;
  availableRanges: string[];
  allowedUsers: string[];
  bannedUsers: string[];
  createdBy: string;
}

type RoomUpdateData = Omit<IChatRoomRes, "_id" | "createdBy">;

interface IUserRes {
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

interface UserUpdateData
  extends Pick<
    IUserRes,
    "username" | "firstname" | "surname" | "birthday" | "country" | "gender" | "nickColor" | "email" | "phone"
  > {
  ranges: string[];
}

interface UserRegisterData extends Omit<UserUpdateData, "ranges"> {
  password: string;
  birthday: Date;
  username: string;
}

interface LoggedUserUpdateData extends Omit<UserUpdateData, "ranges" | "username"> {
  oldPassword?: string;
  newPassword?: string;
  birthday: Date;
}

interface LoginFields {
  username: string;
  password: string;
}

interface UserBanData {
  banTime: number;
  banReason: string;
}
interface IMessagesRes {
  _id: string;
  roomId: string;
  whereSent: IChatRoomRes;
  message: string;
  sentTime: Date;
  sender: IUserRes;
}

interface IRangeRes {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: IUserRes;
}

type RangeUpdateData = Pick<IRangeRes, "name">;
