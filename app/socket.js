const Message = require("./models/message");

module.exports = function (io) {
  console.log("--------------NEW CONNECTION--------------");
  let onlineUsers = {}; //FIXME: change to set
  let rooms = {};

  io.on("connection", (socket) => {
    console.log(`User: joined the site ${socket.id}`);
    // socket.emit("user_connected", data);

    setTimeout(() => {
      //join channels after some delay
      socket.emit("join channels");

      io.emit("user_connected");
    }, 1000);

    socket.onAny((event, ...args) => {
      if (event !== "join channel") console.log("On any: Event:", event, args);
    });

    socket.on("disconnect", () => {
      //When disconnect remove from online later fn
      Object.keys(rooms).forEach((roomId) => {
        let dcSocket = Object.keys(rooms[roomId]).find(
          (sockedId) => sockedId === socket.id
        );
        if (dcSocket) {
          //if user was in room delete and refresh emit
          delete rooms[roomId][dcSocket];
          let data = { roomId: roomId, roomUsers: rooms[roomId] };

          io.to(roomId).emit("room_online_users", data);
        }
      });

      //remove from online users
      let dcGlobalOnlineSocket = Object.keys(onlineUsers).find(
        (sockedId) => sockedId === socket.id
      );
      delete onlineUsers[dcGlobalOnlineSocket];
      io.emit("refresh_online_users", onlineUsers);
    });

    socket.on("join channel", (data) => {
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

    socket.on("user_connected", (data) => {
      onlineUsers[socket.id] = data;
      io.emit("refresh_online_users", onlineUsers);
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
    if (!rooms[roomId]) rooms[roomId] = {};
    rooms[roomId][socketId] = username;

    return rooms[roomId];
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
