import express from "express";
import { chatsList } from "../controllers/chats.controller";
const router = express.Router();

router.get("/", chatsList);

export default router;
