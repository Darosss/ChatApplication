export interface ServerToClientEvents {
  room_online_users: (e: IRoomOnlineUsers) => void;
  refresh_online_users: (e: [string, string][]) => void;
  chat_message: (e: IMessageSocket) => void;
  user_typing: (e: IUserTyping) => void;
}

export interface ClientToServerEvents {
  user_typing: (e: IUserTyping) => void;
  user_connected: (e: string) => void;
  chat_message: (e: IMessageSocket) => void;
  join_channel: (e: IRoomOnlineUsers) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

interface IRoomOnlineUsers {
  roomId: string;
  roomUsers: [string, string][];
  username?: string;
}

interface IUserTyping {
  username: string;
  roomId: string;
}

interface IMessageSocket {
  roomId: string;
  userId: string;
  message: string;
  sender?: string;
  date: Date;
}
