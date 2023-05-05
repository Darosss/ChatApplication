import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

import cors from "cors";
import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";
import passport from "@/config/passport.strategy";

import {
  errorResponder,
  invalidPathHandler,
} from "./middlewares/errorHandler.middleware";
import { initRoutes } from "./routes";
import { corsOptions } from "./config/corsOptions";
import { cookieSessionOpt } from "./config/cookieSessionOptions";
import socket from "./socket";

//Security configs
app.use(helmet());
app.use(hpp());

app.set("trust proxy", 1);
app.set("json spaces", 2);

app.use(cors(corsOptions));

// Cookie settings
app.use(session(cookieSessionOpt));
app.use(express.json()); //For JSON requests
app.use(express.text()); // this is for plan/text format
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
initRoutes(app);

app.use(errorResponder);
app.use(invalidPathHandler);

const httpServer = new http.Server(app);

const socketIO = new Server(httpServer, {
  cors: corsOptions,
});
socket(socketIO);

export default httpServer;
export { app, socketIO };
