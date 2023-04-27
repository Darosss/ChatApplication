import "module-alias/register";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app";
import http from "http";
import mongoose, { ConnectOptions } from "mongoose";
import { Server } from "socket.io";
import socket from "./socket";

import validateEnv from "@/utils/validateEnv";
import { backendPort, databaseUrl, frontendUrl } from "./config/envVariables";

validateEnv();
const httpServer = new http.Server(app);

const socketIO = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
    credentials: true,
    allowedHeaders:
      "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept, Set-Cookie, Cookie",
    methods: ["GET", "POST", "DELETE"],
  },
});
socket(socketIO);

//MONGODB database connection
mongoose.connect(databaseUrl, { useNewUrlParser: true } as ConnectOptions);

httpServer.listen(backendPort, () => {
  console.log(`application is running at:`, httpServer.address());
});
