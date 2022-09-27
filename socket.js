const Message = require("./models/message");

module.exports = function (io) {
  console.log("--------------NEW CONNECTION--------------");

  io.on("connection", (socket) => {
    let rooms = {};
    socket.onAny((event, ...args) => {
      console.log("On any: Event:", event, args);
    });
    // TODO Add new users to 'global' online users with socket id  and username
    socket.on("join room", (data) => {
      let roomName = data.roomName;
      if (!rooms[roomName]) rooms[roomName] = [];
      rooms[roomName].push(data.username);
      socket.join(roomName);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
    });
    socket.on("leave room", (data) => {
      let roomName = data.roomName;
      let room = rooms[roomName];
      room.splice(room.indexOf(data.username), 1);
      data.roomUsers = rooms[roomName];
      io.to(roomName).emit("user online room", data);
      socket.leave(roomName);
    });

    //When disconnect remove from online
    socket.on("disconnect", () => {
      // Object.keys(rooms).forEach((key) => {
      //   console.log(rooms[key]);
      // const found = rooms[key].find(user => user == 'ss' );
      //TODO Clear online users when disconnect
    });
    //On chat message
    socket.on("chat message", (data) => {
      socket.to(data.roomTarget).emit("chat message", data);
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
      socket.to(data.roomName).emit("user typing", data);
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
