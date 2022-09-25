const Message = require("./models/message");

let activeUsers = new Set();
let typingUsers = new Set();
module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected");
    //Connect = online
    socket.on("online", (username) => {
      activeUsers.add(username);
      io.emit("refresh users", [...activeUsers]);

      //When disconnect remove from online
      socket.on("disconnect", () => {
        console.log("disconnect");
        activeUsers.delete(username);
        io.emit("refresh users", [...activeUsers]);
      });
    });
    //On chat message
    socket.on("chat message", async (user, msg, date) => {
      console.log(
        "[server]: user: " + user + "message: " + msg + "date: " + date
      );
      socket.broadcast.emit("chat message", user, msg, date);
      saveMessageToDB(user, msg, date);
    });
    //Info about typing
    socket.on("refresh users typing", (username) => {
      typingUsers.add(username);
      console.log(username);
      console.log("[server]:  is typing: " + typingUsers);
      socket.broadcast.emit("refresh users typing", [...typingUsers]);
    });

    socket.on("remove user typing", (username) => {
      typingUsers.delete(username);
      socket.broadcast.emit("refresh users typing", [...typingUsers]);
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
};
