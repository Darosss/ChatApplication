const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const app = express();
const cors = require("cors");

const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");

const passport = require("./passportConfig");
const jwtRequired = passport.authenticate("jwt", { session: false });

//MIDDLEWARES//
const userCheckBan = require("./routes/middlewares/userCheckBan");
const isBanned = require("./routes/middlewares/isBanned");

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
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders:
    "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept",
  methods: ["GET", "POST", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json()); //For JSON requests
app.use(express.text()); // this is for plan/text format
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/chats", jwtRequired, isBanned, chatsRouter);
app.use("/api/v1/session", userCheckBan, currSessionRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/profil", jwtRequired, userCheckBan, profilRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/rooms", jwtRequired, isBanned, roomsRouter);
app.use("/api/v1/ranges", jwtRequired, isBanned, rangesRouter);
app.use("/api/v1/users", jwtRequired, isBanned, usersRouter);

module.exports = app;
