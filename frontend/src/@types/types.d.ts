interface IAuth {
  id: string;
  username: string;
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

interface IUserRes {
  _id: string;
  username: string;
  firstname?: string;
  surname?: string;
  email?: string;
  birthday: Date;
  createdAt: Date;
  country?: string;
  gender?: string;
  phoneNumber?: string;
  nickColor?: string;
  isBanned: boolean;
  bannedDate?: Date;
  banExpiresDate?: Date;
  banReason?: string;
  ranges: IRangeRes[] | string[];
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
