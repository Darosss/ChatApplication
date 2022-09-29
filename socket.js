const Message = require("./models/message");
const User = require("./models/user");
let onlineUsers = {};
let rooms = {};
module.exports = function (io, sessionMiddleware) {
  console.log("--------------NEW CONNECTION--------------");
  io.use(function (socket, next) {
    sessionMiddleware(socket.request, {}, next);
  }).on("connection", (socket) => {
    var userId = socket.request.session.passport.user;
    console.log(`User: ${userId} joined the site`);
    onlineUsers[socket.id] = userId;
    console.log(onlineUsers);

    socket.onAny((event, ...args) => {
      console.log("On any: Event:", event, args);
    });
    socket.on("join room", (data) => {
      let roomName = data.roomName;
      if (!rooms[roomName]) rooms[roomName] = [];
      rooms[roomName].push(userId);
      socket.join(roomName);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
    });

    socket.on("leave room", (data) => {
      let roomName = data.roomName;
      let room = rooms[roomName];
      room.splice(room.indexOf(userId), 1);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
      socket.leave(roomName);
    });

    //When disconnect remove from online
    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
    });
    //On chat message
    socket.on("chat message", (data) => {
      data.username = userId;
      data.date = new Date();
      io.to(data.roomTarget).emit("chat message", data);
      // saveMessageToDB(user, msg, date);
    });
    socket.on("join channel", (user, channelName) => {
      socket.join(channelName);
    });

    socket.on("testch", (user) => {
      console.log(user);
      console.log("rooms", socket.rooms);
    });

    // socket.on("private msg", (toUser, msg) => {
    //   socket
    //     .to(getKeyByValue(activeUsers, toUser))
    //     .emit("private msg", activeUsers[socket.id], msg);
    // });

    //   //Info about typing
    socket.on("user typing", (data) => {
      data.username = userId;
      socket.to(data.roomName).emit("user typing", data);
    });
    socket.on("test", () => {
      console.log("test pass");
    });
  });

  async function saveMessageToDB(username, msg, date) {
    const message = new Message({
      sender: username,
      message: msg,
      sentTime: date,
    });
    try {
      await message.save();
    } catch (error) {
      console.log("Message couldn't be saved");
    }
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
};
