import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents, RoomOnlineUsers, MessageSocket, UserTyping } from "./types";
import { socketEndpoint } from "@src/constants";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initiateSocketConnection = () => {
  socket = io(socketEndpoint, {
    transports: ["websocket"],
    withCredentials: true,
  });
  console.log("Connecting to socket");
};
export const joinRoom = (room: RoomOnlineUsers) => {
  if (socket && room) socket.emit("join_channel", room);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb: (err: any, msg: MessageSocket) => void) => {
  if (!socket) return true;

  socket.on("chat_message", (msg) => {
    return cb(null, msg);
  });
};

export const roomOnlineUsers = (cb: (err: any, users: RoomOnlineUsers) => void) => {
  if (!socket) return true;

  socket.on("room_online_users", (users) => {
    return cb(null, users);
  });
};

export const refreshOnlineUsers = (cb: (err: any, users: string[]) => void) => {
  if (!socket) return true;

  socket.on("refresh_online_users", (users) => {
    return cb(null, [...new Map(users).values()]);
  });
};

export const sendMessageSocket = (message: MessageSocket) => {
  if (socket) socket.emit("chat_message", message);
};

export const userConnectedEmit = (username: string) => {
  socket.emit("user_connected", username);
};

export const onUserTyping = (cb: (err: any, data: UserTyping) => void) => {
  if (!socket) return true;

  socket.on("user_typing", (data) => {
    return cb(null, data);
  });
};

export const userTypingEmit = (username: string, roomId: string) => {
  socket.emit("user_typing", { username, roomId });
};
