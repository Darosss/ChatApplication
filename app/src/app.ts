import express from "express";

const app = express();

import cors from "cors";
import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";

import passport from "@/config/passport.strategy";

import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import { initRoutes } from "./routes";
import { corsOptions } from "./config/corsOptions";
import { cookieSessionOpt } from "./config/cookieSessionOptions";

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

initRoutes(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandlerMiddleware);
export default app;
