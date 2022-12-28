import "module-alias/register";
import app from "./app";
import http from "http";
import mongoose, { ConnectOptions } from "mongoose";
import { Server } from "socket.io";
import socket from "./socket";
import validateEnv from "@/utils/validateEnv";

validateEnv();
const httpServer = new http.Server(app);

const socketIO = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // optionSuccessStatus: 200,
    allowedHeaders:
      "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept, Set-Cookie, Cookie",
    methods: ["GET", "POST", "DELETE"],
  },
});
socket(socketIO);

//MONGODB database connection
mongoose.connect(
  process.env.DATABASE_URL as string,
  { useNewUrlParser: true } as ConnectOptions
);

httpServer.listen(process.env.BACKEND_PORT || 5000, () => {
  console.log(
    `application is running at: */${process.env.BACKEND_PORT || 5000}`
  );
});
