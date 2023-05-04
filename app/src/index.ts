import "module-alias/register";
import * as dotenv from "dotenv";
import { envFilePath } from "./config/globalPaths";

dotenv.config({ path: envFilePath });

import app from "./app";

import validateEnv from "@/utils/validateEnv";
import { backendPort, databaseUrl } from "./config/envVariables";
import { initDatabase } from "./config/database";

validateEnv();

async function startServer() {
  try {
    await initDatabase(databaseUrl);

    const port = Number(backendPort) || 5000;
    app.listen(port, () => {
      console.log(`application is running on: ${port}`);
    });
  } catch (err) {
    console.error(`Error starting server: ${err}`);
  }
}

startServer();
