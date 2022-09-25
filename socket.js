const Message = require("./models/message");

let activeUsers = new Set();
module.exports = function (io) {
  io.on("connection", (socket) => {
    let tempNickname = socket.id.slice(15);
    console.log("A user connected", "User" + tempNickname);
    //Connect = online
    socket.on("online", () => {
      activeUsers.add("User-" + tempNickname);
      io.emit("refresh users", [...activeUsers]);
    });
    //When disconnect remove from online
    socket.on("disconnect", () => {
      console.log("disconnect");
      activeUsers.delete("User-" + tempNickname);
      io.emit("refresh users", [...activeUsers]);
    });
    //On chat message
    socket.on("chat message", async (msg, date) => {
      console.log("[server]:  message: " + msg + "date: " + date);
      socket.broadcast.emit("chat message", msg, date);
      saveMessageToDB("user", msg, date);
    });
    //Info about typing
    socket.on("user typing", (username) => {
      console.log("[server]:  username is typing: " + username);
      socket.broadcast.emit("user typing", username);
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
