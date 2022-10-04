const Message = require("./models/message");
let onlineUsers = {};
let rooms = {};
module.exports = function (io, sessionMiddleware) {
  console.log("--------------NEW CONNECTION--------------");
  io.use(function (socket, next) {
    sessionMiddleware(socket.request, {}, next);
  }).on("connection", (socket) => {
    var userNick = socket.request.session.passport.user.username;
    console.log(`User: ${userNick} joined the site`);
    onlineUsers[socket.id] = userNick;

    socket.onAny((event, ...args) => {
      console.log("On any: Event:", event, args);
    });
    socket.on("join room", (data) => {
      let roomName = data.roomName;
      if (!rooms[roomName]) rooms[roomName] = [];
      rooms[roomName].push(userNick);
      socket.join(roomName);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
    });

    socket.on("leave room", (data) => {
      let roomName = data.roomName;
      let room = rooms[roomName];
      room.splice(room.indexOf(userNick), 1);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
      socket.leave(roomName);
    });

    //When disconnect remove from online
    socket.on("disconnect", () => {
      Object.keys(rooms).forEach((room) => {
        let userIndex = rooms[room].indexOf(userNick);
        rooms[room].splice(userIndex, 1);
        if (userIndex >= 0)
          socket.to(room).emit("user online room", {
            roomUsers: rooms[room],
            roomName: room,
          });
      });
      delete onlineUsers[socket.id];
    });
    //On chat message
    socket.on("chat message", async (data) => {
      data.username = userNick;
      data.date = new Date();
      io.to(data.roomTarget).emit("chat message", data);
      await saveMessageToDB(
        data.username,
        data.msg,
        data.date,
        data.roomTarget
      );
    });
    socket.on("join channel", (user, channelName) => {
      socket.join(channelName);
    });

    // socket.on("private msg", (toUser, msg) => {
    //   socket
    //     .to(getKeyByValue(activeUsers, toUser))
    //     .emit("private msg", activeUsers[socket.id], msg);
    // });

    //   //Info about typing
    socket.on("user typing", (data) => {
      data.username = userNick;
      socket.to(data.roomName).emit("user typing", data);
    });
  });

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
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
};
