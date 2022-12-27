import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

import express from "express";

const app = express();

import cors from "cors";

import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";

import passport from "./passportConfig";
const jwtRequired = passport.authenticate("jwt", { session: false });

//MIDDLEWARES//
import userCheckBan from "@/middlewares/userCheckBan";
import isBanned from "@/middlewares/isBanned";

// ROUTES //
import currSessionRouter from "./routes/session.router";
import chatsRouter from "./routes/chats.router";
import profilRouter from "./routes/profil.router";
import loginRouter from "./routes/login.router";
import registerRouter from "./routes/register.router";
import logoutRouter from "./routes/logout.router";
import roomsRouter from "./routes/rooms.router";
import rangesRouter from "./routes/ranges.router";
import usersRouter from "./routes/users.router";

//Security configs
app.use(helmet());
app.use(hpp());

app.set("trust proxy", 1);

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders:
    "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept, Set-Cookie, Cookie",
  methods: ["GET", "POST", "DELETE"],
};

app.use(cors(corsOptions));
// Cookie settings
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);

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

export default app;
