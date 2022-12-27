import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import {
  getListOfUsers,
  getUserById,
  editUserById,
  banUserById,
  unbanUserById,
} from "../controllers/users.controller";

const router = Router();

router.get("/", getListOfUsers);

//Get user by id
router.get("/:userId", getUserById);

//Edit user by id route
router.post("/edit/:userId", isAdmin, editUserById);

//Ban user by id route
router.post("/ban/:userId/", isAdmin, banUserById);

//Unban user by id route
router.post("/unban/:userId", isAdmin, unbanUserById);

export default router;
