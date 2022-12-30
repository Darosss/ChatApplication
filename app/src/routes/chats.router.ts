import express from "express";
import isValidMongooseId from "@/middlewares/isValidMongooseId";
import {
  chatsList,
  getRoomsMessagesById,
} from "../controllers/chats.controller";

const router = express.Router();

router.get("/", chatsList);

router.get("/:_id", isValidMongooseId, getRoomsMessagesById);

export default router;
