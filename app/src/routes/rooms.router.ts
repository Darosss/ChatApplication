import { Router } from "express";
import chatRoomValidation from "@/middlewares/chatRoomValidation";

const router = Router();
import {
  getListOfRooms,
  createNewRoom,
  getRoomById,
  editRoomById,
  deleteRoomById,
} from "../controllers/rooms.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

router.get("/", getListOfRooms);

//Create new chatroom
router.post("/create", createNewRoom);

//Get chatroom by id
router.get("/:_id", isValidMongooseId, getRoomById);

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
