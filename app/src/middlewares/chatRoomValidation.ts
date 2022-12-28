import isAdmin from "@/utils/isAdminUser";
import { ChatRoom } from "@/models/chatRoom";
import { Response, NextFunction } from "express";
import { RequestUserAuth } from "@types";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  const roomId = req.params.roomId;
  const room = await ChatRoom.findById(roomId);
  const userId = req.user?.id;
  if (userId)
    if (room?.createdBy.toString() === userId || (await isAdmin(userId)))
      return next();
    else res.status(403).send({ message: "You are not owner of this room" });
}
