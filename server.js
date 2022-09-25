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

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg, date) => {
    console.log("message: " + msg + "date" + date);
    io.emit("chat message", msg, date);
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
