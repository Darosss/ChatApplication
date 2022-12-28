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

const router = Router();

router.get("/", getListOfUsers);

router.get("/:userId", getUserById);

router.get("/rooms/:userId", getUsersRoomsById);

router.post("/admin/edit/:userId", isAdmin, editUserById);

router.post("/admin/ban/:userId/", isAdmin, banUserById);

router.post("/admin/unban/:userId", isAdmin, unbanUserById);

export default router;
