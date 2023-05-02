import { Express } from "express";
import profilRouter from "./profil.router";
import authRouter from "./auth.router";
import roomsRouter from "./rooms.router";
import rangesRouter from "./ranges.router";
import usersRouter from "./users.router";
import userCheckBan from "@/middlewares/userCheckBan";
import isBanned from "@/middlewares/isBanned";
import { jwtRequired } from "@/middlewares/jwtRequired";

export const initRoutes = (app: Express) => {
  app.use("/api/v1", userCheckBan, authRouter);
  app.use("/api/v1/profil", jwtRequired, userCheckBan, profilRouter);
  app.use("/api/v1/rooms", jwtRequired, isBanned, roomsRouter);
  app.use("/api/v1/ranges", jwtRequired, isBanned, rangesRouter);
  app.use("/api/v1/users", jwtRequired, isBanned, usersRouter);
};
