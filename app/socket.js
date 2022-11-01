const Message = require("./models/message");

module.exports = function (io) {
  console.log("--------------NEW CONNECTION--------------");
  let onlineUsers = {};
  let rooms = {};

  io.on("connection", (socket) => {
    let userNick = "Kappa";

    console.log(`User: joined the site ${socket.id}`);
    onlineUsers[socket.id] = userNick;

    setTimeout(() => {
      //join channels after some delay
      socket.emit("join channels");
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
