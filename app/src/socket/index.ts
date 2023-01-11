import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "@/libs.global/types/socket";
import { Server } from "socket.io";

import { Message } from "@/models/message";

export default function (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  console.log("--------------NEW CONNECTION--------------");
  const onlineUsers = new Map();
  const roomsUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`User: joined the site ${socket.id}`);

    //When disconnect remove user from Map onlineUsers/roomsUsers
    socket.on("disconnect", () => {
      for (const roomId of roomsUsers.keys()) {
        const roomUsers = roomsUsers.get(roomId);

        if (roomUsers.has(socket.id)) {
          roomUsers.delete(socket.id);
          const data = {
            roomId: roomId,
            roomUsers: Array.from(roomUsers) as string[],
          };

          io.to(roomId).emit("room_online_users", data);
        }
      }

      //remove from online users
      if (onlineUsers.has(socket.id)) onlineUsers.delete(socket.id);

      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    /**
     * @param {string} roomId - id of joining room
     * @param {string[]} roomUsers - online users in room
     * @param {string} username - user username of joining room
     */
    socket.on("join_channel", (data) => {
      //data:  username , userId, roomId
      socket.join(data.roomId);

      data.roomUsers = addOnlineUserToRoom(
        data.roomId,
        data.username as string,
        socket.id
      ) as string[];
      io.to(data.roomId).emit("room_online_users", data);
    });

    /**
     * @param {string} roomId - id of room that message is assigned to
     * @param {string} userId - sender ID
     * @param {string} message - message context
     * @param {string} sender - sender message
     * @param {Date} date - date of message
     */
    socket.on("chat_message", async (data) => {
      data.date = new Date();
      io.to(data.roomId).emit("chat_message", data);
      if (
        await saveMessageToDB(data.userId, data.message, data.date, data.roomId)
      )
        //TODO: socket error message
        console.log("xd");
      else {
        console.log("not XD");
      }
    });

    /**
     * @param {string} username - username of connected user
     */
    socket.on("user_connected", (username) => {
      onlineUsers.set(socket.id, username);
      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    /**
     * @param {string} username - username of user typing
     * @param {string} roomId - room Id where user is typing
     */
    socket.on("user_typing", (data) => {
      socket.to(data.roomId).emit("user_typing", data);
    });
  });

  function addOnlineUserToRoom(
    roomId: string,
    username: string,
    socketId: string
  ) {
    if (!roomsUsers.has(roomId)) roomsUsers.set(roomId, new Map());
    const userRoomMap = roomsUsers.get(roomId);
    userRoomMap.set(socketId, username);

    return Array.from(roomsUsers.get(roomId));
  }

  async function saveMessageToDB(
    userId: string,
    msg: string,
    date: Date,
    room: string
  ) {
    const message = new Message({
      sender: userId,
      message: msg,
      sentTime: date,
      whereSent: room,
    });
    try {
      await message.save();
      return true;
    } catch (error) {
      console.log(error, "Message couldn't be saved. Try again later.");
      return false;
    }
  }
}
