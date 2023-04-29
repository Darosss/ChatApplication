import { Router } from "express";
import chatRoomValidation from "@/middlewares/chatRoomValidation";

const router = Router();
import { chatRoomsController } from "../controllers/rooms.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

router.get("/", chatRoomsController.getListOfLoggedUserRooms);

//Get list of user's rooms
router.get("/users-rooms", chatRoomsController.getListOfUsersRooms);

//Create new chatroom
router.post("/create", chatRoomsController.createNewRoom);

// Remove chatroom route
router.delete(
  "/delete/:_id",
  isValidMongooseId,
  chatRoomValidation,
  chatRoomsController.deleteRoomById
);

//Get chatroom by id
router.get("/:_id", isValidMongooseId, chatRoomsController.getRoomById);

//Get messages of room by id
//TODO: add middleware to checks if user can acces or isAdmin
router.get(
  "/:_id/messages",
  isValidMongooseId,
  chatRoomsController.getRoomsMessagesById
);

//Edit chatroom by id route
router.post(
  "/edit/:_id",
  isValidMongooseId,
  chatRoomValidation,
  chatRoomsController.editRoomById
);

export default router;
