import { Router } from "express";
import chatRoomValidation from "@/middlewares/chatRoomValidation";

const router = Router();
import {
  getListOfRooms,
  createNewRoom,
  getRoomById,
  editRoomById,
  deleteRoomById,
  getListOfUsersRooms,
  getRoomsMessagesById,
} from "../controllers/rooms.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

router.get("/", getListOfRooms);

//Get list of user's rooms
router.get("/users-rooms", getListOfUsersRooms);

//Create new chatroom
router.post("/create", createNewRoom);

// Remove chatroom route
router.delete(
  "/delete/:_id",
  isValidMongooseId,
  chatRoomValidation,
  deleteRoomById
);

//Get chatroom by id
router.get("/:_id", isValidMongooseId, getRoomById);

//Get messages of room by id
//TODO: add middleware to checks if user can acces or isAdmin
router.get("/:_id/messages", isValidMongooseId, getRoomsMessagesById);

//Edit chatroom by id route
router.post("/:_id", isValidMongooseId, chatRoomValidation, editRoomById);

export default router;
