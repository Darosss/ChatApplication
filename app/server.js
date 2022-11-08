const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = require("express")();
const http = require("http").Server(app);
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");

const passport = require("./passportConfig");
const jwtRequired = passport.authenticate("jwt", { session: false });

// CUSTOM MIDDLEWARES //
const isAdmin = require("./routes/middlewares/isAdmin");

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

//MONGODB database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require("./socket")(socketIO);

app.use(passport.initialize());
app.use(passport.session());
app.use("/chats", chatsRouter);
app.use("/api", currSessionRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profil", jwtRequired, profilRouter);
app.use("/logout", jwtRequired, logoutRouter);
app.use("/rooms", jwtRequired, roomsRouter);
app.use("/ranges", jwtRequired, isAdmin, rangesRouter);
app.use("/users", jwtRequired, isAdmin, usersRouter);

//Listen port
http.listen(process.env.PORT || 5000, () => {
  console.log(`application is running at: */${process.env.PORT || 5000}`);
});
