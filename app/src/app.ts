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

import { cookieSecret, frontendUrl, nodeEnv } from "./config/envVariables";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import { initRoutes } from "./routes";

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

initRoutes(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandlerMiddleware);
export default app;
