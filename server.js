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
const methodOverride = require("method-override");
const passport = require("passport");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const indexRouter = require("./routes/index");
const profilRouter = require("./routes/profil");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const chatRoomRouter = require("./routes/chatRoom");
const rangesRouter = require("./routes/ranges");
const usersRouter = require("./routes/users");
const { session } = require("passport");
const isLogedIn = require("./routes/middlewares/isLogedIn");
const layoutAuth = require("./routes/middlewares/layoutAuth");
const isAdministrator = require("./routes/middlewares/isAdministrator");
//socket io functions in another file for readability

//MONGODB database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

//View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
//Static folder
app.use(express.static(__dirname + "/public"));
//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
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

//Use routes
var isLogedInFilter = function (req, res, next) {
  if (
    req._parsedUrl.pathname === "/login" ||
    req._parsedUrl.pathname === "/register"
  ) {
    next();
  } else {
    isLogedIn(req, res, next);
  }
};

app.use(isLogedInFilter);
app.use(layoutAuth);
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profil", profilRouter);
app.use("/logout", logoutRouter);
app.use("/chatrooms", chatRoomRouter);
app.use("/ranges", isAdministrator, rangesRouter);
app.use("/users", isAdministrator, usersRouter);

//Listen port
httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`application is running at: */${process.env.PORT || 3000}`);
});
