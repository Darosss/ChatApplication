const dotenv = require("dotenv");
const path = require("path");

/* Import config */ // THIS IS NEW :)
dotenv.config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// const expressSession = require("express-session");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
// const csurf = require("csurf");
const cors = require("cors");
const methodOverride = require("method-override");
const passport = require("./passportConfig");
const jwtRequired = passport.authenticate("jwt", { session: false });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

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

//View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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
// app.use(csurf());

// app.use(limiter);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
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

  // Pass to next layer of middleware
  next();
});
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// app.use(cookieParser());

// var sessionMiddleware = expressSession({
//   name: "COOKIE_NAME_HERE",
//   secret: "COOKIE_SECRET_HERE",
//   resave: true,
//   saveUninitialized: true,
//   store: new (require("connect-mongo")(expressSession))({
//     url: process.env.DATABASE_URL,
//     ttl: 14 * 24 * 60 * 60,
//     autoRemove: "native",
//   }),
//   cookie: {
//     maxAge: 360000,
//     secure: false,
//   },
// });
// require("./socket")(io, sessionMiddleware);
// app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);
app.use("/chats", chatsRouter);
app.use("/api", currSessionRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profil", jwtRequired, profilRouter);
app.use("/logout", logoutRouter);
app.use("/rooms", roomsRouter);
app.use("/ranges", rangesRouter);
app.use("/users", usersRouter);
//Listen port
httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`application is running at: */${process.env.PORT || 5000}`);
});
//TODO make verification with jwt or other idk
