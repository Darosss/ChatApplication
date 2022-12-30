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

//Get chatroom by id
router.get("/:_id", isValidMongooseId, getRoomById);

//Get list of user's rooms
router.get("/users-rooms", getListOfUsersRooms);

//Get messages of room by id
router.get("/:_id", isValidMongooseId, getRoomsMessagesById);

//Create new chatroom
router.post("/create", createNewRoom);

//Edit chatroom by id route
router.post("/:_id", isValidMongooseId, chatRoomValidation, editRoomById);

// Remove chatroom route
router.delete(
  "/delete/:_id",
  isValidMongooseId,
  chatRoomValidation,
  deleteRoomById
);

export default router;
