const Message = require("./models/message");
let onlineUsers = {};
let rooms = {};
module.exports = function (io) {
  console.log("--------------NEW CONNECTION--------------");
  io.on("connection", (socket) => {
    let user = { username: "TEST", _id: "43242141" };
    let userNick = user.username;
    let userId = user._id;

    console.log(`User: ${userNick} joined the site ${socket.id}`);
    onlineUsers[socket.id] = userNick;

    setTimeout(() => {
      socket.emit("join channels");
    }, 2000);

    socket.onAny((event, ...args) => {
      console.log("On any: Event:", event, args);
    });

    socket.on("user online", (data) => {
      io.emit("user online", onlineUsers);
    });

    // socket.on("join room", (data) => {
    //   let roomName = data.roomName;
    //   if (!rooms[roomName]) rooms[roomName] = [];
    //   rooms[roomName].push(userNick);
    //   socket.join(roomName);
    //   data.roomUsers = rooms[roomName];
    //   io.to(roomName).emit("user online room", data);
    // });

    // socket.on("leave room", (data) => {
    //   let roomName = data.roomName;
    //   let room = rooms[roomName];
    //   room.splice(room.indexOf(userNick), 1);
    //   data.roomUsers = rooms[roomName];
    //   io.to(roomName).emit("user online room", data);
    //   socket.leave(roomName);
    // });

    //When disconnect remove from online
    socket.on("disconnect", () => {
      console.log("disconnect");
      // Object.keys(rooms).forEach((room) => {
      //   let userIndex = rooms[room].indexOf(userNick);
      //   rooms[room].splice(userIndex, 1);
      //   if (userIndex >= 0)
      //     socket.to(room).emit("user online room", {
      //       roomUsers: rooms[room],
      //       roomName: room,
      //     });
      // });
      // delete onlineUsers[socket.id];
      // io.emit("user online", onlineUsers);
    });

    socket.on("join channel", (data) => {
      console.log("Room joined");
      socket.join(data.roomId);
    });

    //On chat message
    socket.on("chat message", async (data) => {
      data.date = new Date();
      io.to(data.roomId).emit("chat message", data);
      // await saveMessageToDB(data.userId, data.message, data.date, data.roomId);
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
