import "./style.css";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  IMessageSocket,
  IRoomOnlineUsers,
  IUserTyping,
  ServerToClientEvents,
} from "@libs/types/socket";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initiateSocketConnection = () => {
  socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
    transports: ["websocket"],
    withCredentials: true,
  });
  console.log("Connecting to socket");
};
export const joinRoom = (room: IRoomOnlineUsers) => {
  if (socket && room) socket.emit("join_channel", room);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb: (err: any, msg: IMessageSocket) => void) => {
  if (!socket) return true;

  socket.on("chat_message", (msg) => {
    return cb(null, msg);
  });
};

export const roomOnlineUsers = (cb: (err: any, users: IRoomOnlineUsers) => void) => {
  if (!socket) return true;

  socket.on("room_online_users", (users) => {
    return cb(null, users);
  });
};

export const refreshOnlineUsers = (cb: (err: any, users: [string, string][]) => void) => {
  if (!socket) return true;

  socket.on("refresh_online_users", (users) => {
    return cb(null, users);
  });
};

export const sendMessageSocket = (message: IMessageSocket) => {
  if (socket) socket.emit("chat_message", message);
};

export const userConnectedEmit = (username: string) => {
  socket.emit("user_connected", username);
};

export const onUserTyping = (cb: (err: any, data: IUserTyping) => void) => {
  if (!socket) return true;

  socket.on("user_typing", (data) => {
    return cb(null, data);
  });
};

export const userTypingEmit = (username: string, roomId: string) => {
  socket.emit("user_typing", { username, roomId });
};
