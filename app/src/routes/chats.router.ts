import express from "express";
import {
  chatsList,
  getRoomsMessagesById,
} from "../controllers/chats.controller";
const router = express.Router();

router.get("/", chatsList);

router.get("/:roomId", getRoomsMessagesById);

export default router;
