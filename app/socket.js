const Message = require("./models/message");

module.exports = function (io) {
  console.log("--------------NEW CONNECTION--------------");
  let onlineUsers = new Map();
  let roomsUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`User: joined the site ${socket.id}`);

    socket.onAny((event, ...args) => {
      if (event !== "join channel") console.log("On any: Event:", event, args);
    });

    socket.on("disconnect", () => {
      //When disconnect remove from online later fn

      for (const roomId of roomsUsers.keys()) {
        let roomUsers = roomsUsers.get(roomId);
        if (roomUsers.has(socket.id)) {
          roomUsers.delete(socket.id);
          let data = { roomId: roomId, roomUsers: Array.from(roomUsers) };

          io.to(roomId).emit("room_online_users", data);
        }
      }

      //remove from online users
      if (onlineUsers.has(socket.id)) onlineUsers.delete(socket.id);
      //FIXME

      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    socket.on("join channel", (data) => {
      console.log("Joining the room ", data);
      //data:  username , userId, roomId
      socket.join(data.roomId);

      data.roomUsers = addOnlineUserToRoom(
        data.roomId,
        data.username,
        socket.id
      );
      io.to(data.roomId).emit("room_online_users", data);
    });

    //On chat message
    socket.on("chat message", async (data) => {
      data.date = new Date();
      io.to(data.roomId).emit("chat message", data);
      await saveMessageToDB(data.userId, data.message, data.date, data.roomId);
    });

    //When user emits it, it add user to onlineUsers map then emit refresh_onlinie_users
    socket.on("user_connected", (data) => {
      onlineUsers.set(socket.id, data);
      io.emit("refresh_online_users", Array.from(onlineUsers));
    });

    // socket.on("private msg", (toUser, msg) => {
    //   socket
    //     .to(getKeyByValue(activeUsers, toUser))
    //     .emit("private msg", activeUsers[socket.id], msg);
    // });

    //   //Info about typing

    // socket.on("user typing", (data) => {
    //   data.username = userNick;
    //   socket.to(data.roomName).emit("user typing", data);
    // });
  });

  function addOnlineUserToRoom(roomId, username, socketId) {
    if (!roomsUsers.has(roomId)) roomsUsers.set(roomId, new Map());
    let userRoomMap = roomsUsers.get(roomId);
    userRoomMap.set(socketId, username);

    return Array.from(roomsUsers.get(roomId));
  }

  async function saveMessageToDB(username, msg, date, room) {
    console.log("room", room);
    const message = new Message({
      sender: username,
      message: msg,
      sentTime: date,
      whereSent: room,
    });
    try {
      await message.save();
    } catch (error) {
      console.log(error, "Message couldn't be saved");
    }
  }
};
