import "./style.css";
import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = () => {
  //   socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
  socket = io("http://localhost:5000");
  console.log(`Connecting socket...`);
};
export const joinRoom = (room) => {
  if (socket && room) socket.emit("join channel", room);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;

  socket.on("chat message", (msg) => {
    return cb(null, msg);
  });
};

export const roomOnlineUsers = (cb) => {
  if (!socket) return true;

  socket.on("room_online_users", (users) => {
    return cb(null, users);
  });
};

export const refreshOnlineUsers = (cb) => {
  if (!socket) return true;

  socket.on("refresh_online_users", (users) => {
    return cb(null, users);
  });
};

export const sendMessageSocket = (message) => {
  if (socket) socket.emit("chat message", message);
};

export const userConnectedEmit = (username) => {
  socket.emit("user_connected", username);
};

export const onUserTyping = (cb) => {
  if (!socket) return true;

  socket.on("user_typing", (data) => {
    return cb(null, data);
  });
};

export const userTypingEmit = (username, roomId) => {
  socket.emit("user_typing", { username, roomId });
};
