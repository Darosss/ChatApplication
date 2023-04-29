import "module-alias/register";
import * as dotenv from "dotenv";
import { envFilePath } from "./config/globalPaths";

dotenv.config({ path: envFilePath });

import app from "./app";
import http from "http";
import { Server } from "socket.io";
import socket from "./socket";

import validateEnv from "@/utils/validateEnv";
import { backendPort, databaseUrl } from "./config/envVariables";
import { initDatabase } from "./config/database";
import { corsOptions } from "./config/corsOptions";

validateEnv();

const httpServer = new http.Server(app);

const socketIO = new Server(httpServer, {
  cors: corsOptions,
});

socket(socketIO);

initDatabase(databaseUrl).then(() => {
  httpServer.listen(backendPort, () => {
    console.log(`application is running at:`, httpServer.address());
  });
});
