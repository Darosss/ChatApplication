if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const expressSession = require("express-session");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const methodOverride = require("method-override");
const passport = require("passport");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// ROUTES //
const indexRouter = require("./routes/index");
const profilRouter = require("./routes/profil");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const chatRoomRouter = require("./routes/chatRoom");
const rangesRouter = require("./routes/ranges");
const usersRouter = require("./routes/users");

// // ROUTES MIDDLEWARES //
// const isLogedIn = require("./routes/middlewares/isLogedIn");
// const layoutAuth = require("./routes/middlewares/layoutAuth");
// const isAdminForwarding = require("./routes/middlewares/isAdminForwarding");
// const isBannedForwarding = require("./routes/middlewares/isBannedForwarding");

//MONGODB database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

//View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

var sessionMiddleware = expressSession({
  name: "COOKIE_NAME_HERE",
  secret: "COOKIE_SECRET_HERE",
  resave: true,
  saveUninitialized: true,
  store: new (require("connect-mongo")(expressSession))({
    url: process.env.DATABASE_URL,
  }),
  expires: new Date(Date.now() + 1000 * 60 * 30),
});

require("./socket")(io, sessionMiddleware);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// var isLogedInFilter = function (req, res, next) {
//   if (
//     req._parsedUrl.pathname === "/login" ||
//     req._parsedUrl.pathname === "/register"
//   ) {
//     next();
//   } else {
//     isLogedIn(req, res, next);
//   }
// };
// var isBannedForwardingFilter = function (req, res, next) {
//   let path = req._parsedUrl.pathname;
//   if (
//     path === "/profil" ||
//     path === "/logout" ||
//     path === "/login" ||
//     path === "/register"
//   )
//     next();
//   else {
//     isBannedForwarding(req, res, next);
//   }
// };

// app.use(isLogedInFilter);
// app.use(layoutAuth);
// app.use(isBannedForwardingFilter);
app.use("/index", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profil", profilRouter);
app.use("/logout", logoutRouter);
app.use("/chatrooms", chatRoomRouter);
app.use("/ranges", rangesRouter);
app.use("/users", usersRouter);
// app.use("/ranges", isAdminForwarding, rangesRouter);
// app.use("/users", isAdminForwarding, usersRouter);

//Listen port
httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`application is running at: */${process.env.PORT || 5000}`);
});
