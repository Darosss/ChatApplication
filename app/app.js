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
  allowedHeaders: "X-Requested-With,content-type",
  methods: ["GET", "POST", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/chats", jwtRequired, chatsRouter);
app.use("/api/v1/session", currSessionRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/profil", jwtRequired, profilRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/rooms", jwtRequired, roomsRouter);
app.use("/api/v1/ranges", jwtRequired, rangesRouter);
app.use("/api/v1/users", jwtRequired, usersRouter);

module.exports = app;
