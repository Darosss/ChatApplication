import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import { Server } from "socket.io";

import { messageService } from "@/services/messageService";

export default function (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  console.log("--------------NEW CONNECTION--------------");
  const onlineUsers = new Map<string, string>();
  const roomsUsers = new Map<string, Map<string, string>>();

  io.on("connection", (socket) => {
    console.log(`User: joined the site ${socket.id}`);

    //When disconnect remove user from Map onlineUsers/roomsUsers
    socket.on("disconnect", () => {
      for (const roomId of roomsUsers.keys()) {
        const roomUsers = roomsUsers.get(roomId);

        if (roomUsers?.has(socket.id)) {
          roomUsers.delete(socket.id);
          const data = {
            roomId: roomId,
            roomUsers: Array.from(roomUsers) as [string, string][],
          };

          io.to(roomId).emit("room_online_users", data);
        }
      }

      //remove from online users
      if (onlineUsers.has(socket.id)) onlineUsers.delete(socket.id);

      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    socket.on("join_channel", (data) => {
      //data:  username , userId, roomId
      socket.join(data.roomId);

      data.roomUsers = addOnlineUserToRoom(
        data.roomId,
        data.username as string,
        socket.id
      );

      io.to(data.roomId).emit("room_online_users", data);
    });

    socket.on("chat_message", async (data) => {
      data.date = new Date();
      io.to(data.roomId).emit("chat_message", data);

      try {
        await messageService.createNewMessage({
          message: data.message,
          sender: data.userId,
          sentTime: data.date,
          whereSent: data.roomId,
        });
      } catch (err) {
        console.error("Received message couldn't be saved", err);
      }
    });

    socket.on("user_connected", (username) => {
      onlineUsers.set(socket.id, username);
      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    socket.on("user_typing", (data) => {
      socket.to(data.roomId).emit("user_typing", data);
    });
  });

  function addOnlineUserToRoom(
    roomId: string,
    username: string,
    socketId: string
  ): [string, string][] {
    if (!roomsUsers.has(roomId))
      roomsUsers.set(roomId, new Map<string, string>());
    const userRoomMap = roomsUsers.get(roomId);
    userRoomMap?.set(socketId, username);

    if (userRoomMap) {
      return Array.from(userRoomMap);
    }
    return [["", ""]];
  }
}
