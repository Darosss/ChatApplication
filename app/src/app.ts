import dotenv from "dotenv";
import { envFilePath } from "./config/globalPaths";

dotenv.config({ path: envFilePath });
import express from "express";

const app = express();

import cors from "cors";

import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";

import passport from "@/config/passport.strategy";
const jwtRequired = passport.authenticate("jwt", { session: false });

//MIDDLEWARES//
import userCheckBan from "@/middlewares/userCheckBan";
import isBanned from "@/middlewares/isBanned";

// ROUTES //
import profilRouter from "./routes/profil.router";
import authRouter from "./routes/auth.router";
import roomsRouter from "./routes/rooms.router";
import rangesRouter from "./routes/ranges.router";
import usersRouter from "./routes/users.router";
import { cookieSecret, frontendUrl, nodeEnv } from "./config/envVariables";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";

//Security configs
app.use(helmet());
app.use(hpp());

app.set("trust proxy", 1);
app.set("json spaces", 2);

const corsOptions = {
  origin: frontendUrl,
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
    secret: cookieSecret,
    secure: nodeEnv === "development" ? false : true,
    sameSite: nodeEnv !== "development" ? "none" : "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);

app.use(express.json()); //For JSON requests
app.use(express.text()); // this is for plan/text format
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", userCheckBan, authRouter);
app.use("/api/v1/profil", jwtRequired, userCheckBan, profilRouter);
app.use("/api/v1/rooms", jwtRequired, isBanned, roomsRouter);
app.use("/api/v1/ranges", jwtRequired, isBanned, rangesRouter);
app.use("/api/v1/users", jwtRequired, isBanned, usersRouter);

app.use(errorHandlerMiddleware);
export default app;
