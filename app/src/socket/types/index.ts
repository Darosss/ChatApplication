export interface ServerToClientEvents {
  room_online_users: (e: RoomOnlineUsers) => void;
  refresh_online_users: (e: [string, string][]) => void;
  chat_message: (e: MessageSocket) => void;
  user_typing: (e: UserTyping) => void;
}

export interface ClientToServerEvents {
  user_typing: (e: UserTyping) => void;
  user_connected: (e: string) => void;
  chat_message: (e: MessageSocket) => void;
  join_channel: (e: RoomOnlineUsers) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface RoomOnlineUsers {
  roomId: string;
  roomUsers: [string, string][];
  username?: string;
}

export interface UserTyping {
  username: string;
  roomId: string;
}

export interface MessageSocket {
  roomId: string;
  userId: string;
  message: string;
  sender?: string;
  date: Date;
}
