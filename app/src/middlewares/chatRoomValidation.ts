import isAdmin from "@/utils/isAdminUser";
import { Response, NextFunction } from "express";
import { RequestUserAuth } from "@types";
import { chatRoomService } from "@/services/chatRoomService";

export default async function (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) {
  const roomId = req.params._id;
  const room = await chatRoomService.getRoomById(roomId);
  const userId = req.user?.id;

  if (userId && room) {
    if (String(room.createdBy) === String(userId) || (await isAdmin(userId))) {
      return next();
    } else res.status(403).send({ message: "You are not owner of this room" });
  }
}
