interface IAuth {
  id?: string;
  username: string;
  administrator?: boolean;
  isBanned?: boolean;
}

interface IChatRoomRes {
  [_id: string]: string;
  id: string;
  name: string;
  availableRanges: string[]; //TODO change to IRangeRes[]
  allowedUsers: string[]; //TODO Change to IUserRes[]
  bannedUsers: string[]; // TODO Change to IUserRes[]
  createdBy: string; // TODO Change to IUserRes
}

interface IUserRes {
  [_id: string]: string;
  id: string;
  username?: string;
  firstname?: string;
  surname?: string;
  email?: string;
  birthday?: Date;
  createdAt: Date;
  country?: string;
  gender?: string;
  phoneNumber?: string;
  nickColor?: string;
  isBanned: boolean;
  bannedDate?: Date;
  banExpiresDate?: Date;
  banReason?: string;
  ranges: IRangeRes[];
}

interface IMessagesRes {
  roomId: string;
  id: string;
  whereSent: IChatRoomRes;
  message: string;
  sentTime: Date;
  sender: IUserRes;
}

interface IRangeRes {
  [_id: string]: string;
  id: string;
  name: string;
  createdAt: Date;
  createdBy: IUserRes;
}
