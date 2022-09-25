if (process.env.NODE_ENV !== "producuction") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const session = require("express-session");
const io = new Server(server);
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
// const sessionMiddleware = session({
//   secret: "changeit",
//   resave: false,
//   saveUninitialized: false,
// });

// const wrap = (middleware) => (socket, next) =>
//   middleware(socket.request, {}, next);
// io.use(wrap(sessionMiddleware));

// io.use((socket, next) => {
//   const session = socket.request.session;
//   if (session && session.authenticated) {
//     next();
//   } else {
//     next(new Error("unauthorized"));
//   }
// });
let activeUsers = new Set();
io.on("connection", (socket) => {
  let tempNickname = socket.id.slice(15);
  console.log("a user connected", "User" + tempNickname);
  socket.on("disconnect", () => {
    console.log("disconnect");
    activeUsers.delete("User" + tempNickname);
    io.emit("user online", [...activeUsers]);
  });
  socket.on("user online", () => {
    activeUsers.add("User" + tempNickname);
    io.emit("user online", [...activeUsers]);
  });

  socket.on("chat message", (msg, date) => {
    console.log("[server]:  message: " + msg + "date: " + date);
    socket.broadcast.emit("chat message", msg, date);
  });
  socket.on("user typing", (username) => {
    console.log("[server]:  username is typing: " + username);
    socket.broadcast.emit("user typing", username);
  });
});

//View engine
app.set("view engine", "ejs");
//Views
app.set("views", __dirname + "/views");

// app.use(sessionMiddleware);

//Static folder
app.use(express.static(__dirname + "/public"));
//Body parser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//MONGODB database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

//Routes(later login logout)
app.use("/", indexRouter);

//Listen port
server.listen(process.env.PORT || 3000, () => {
  console.log(`application is running at: http://localhost:${3000}`);
});
