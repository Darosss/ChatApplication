import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import {
  getListOfUsers,
  getUserById,
  editUserById,
  banUserById,
  unbanUserById,
  getUsersRoomsById,
} from "../controllers/users.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

const router = Router();

router.get("/", getListOfUsers);

router.get("/:_id", isValidMongooseId, getUserById);

router.get("/rooms/:_id", isValidMongooseId, getUsersRoomsById);

router.post("/admin/edit/:_id", isValidMongooseId, isAdmin, editUserById);

//TODO: add middleware to check if want to ban amdin
router.post("/admin/ban/:_id", isValidMongooseId, isAdmin, banUserById);

router.post("/admin/unban/:_id", isValidMongooseId, isAdmin, unbanUserById);

export default router;
