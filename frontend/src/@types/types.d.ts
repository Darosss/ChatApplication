interface IAuth {
  id?: string;
  username: string;
  administrator?: boolean;
  isBanned?: boolean;
}

interface IChatRoomRes {
  id?: string;
}
interface IMessagesRes {
  id?: string;
  roomId?: string;
}
