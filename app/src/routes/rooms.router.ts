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

router.get("/", getListOfRooms);

//Create new chatroom
router.post("/create", createNewRoom);

//Get chatroom by id
router.get("/:roomId", getRoomById);

//Edit chatroom by id route
router.post("/:roomId", chatRoomValidation, editRoomById);

router.get("/delete/:roomId", chatRoomValidation);

// Remove chatroom route
router.delete("/delete/:roomId", chatRoomValidation, deleteRoomById);

export default router;
