const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");

const passport = require("./passportConfig");
const jwtRequired = passport.authenticate("jwt", { session: false });

// ROUTES //
const currSessionRouter = require("./routes/currSessionRouter");
const chatsRouter = require("./routes/chats");
const profilRouter = require("./routes/profil");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const roomsRouter = require("./routes/rooms");
const rangesRouter = require("./routes/ranges");
const usersRouter = require("./routes/users");

//Security configs
app.use(helmet());
app.use(hpp());

// Cookie settings
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);
app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use("/chats", jwtRequired, chatsRouter);
app.use("/api", currSessionRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profil", jwtRequired, profilRouter);
app.use("/logout", logoutRouter);
app.use("/rooms", jwtRequired, roomsRouter);
app.use("/ranges", jwtRequired, rangesRouter);
app.use("/users", jwtRequired, usersRouter);

module.exports = app;
