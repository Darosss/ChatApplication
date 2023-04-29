import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { usersController } from "../controllers/users.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

const router = Router();

router.get("/", usersController.getListOfUsers);

router.get("/:_id", isValidMongooseId, usersController.getUserById);

router.get("/rooms/:_id", isValidMongooseId, usersController.getUsersRoomsById);

router.post(
  "/admin/edit/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.editUserById
);

//TODO: add middleware to check if want to ban amdin
router.post(
  "/admin/ban/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.banUserById
);

router.post(
  "/admin/unban/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.unbanUserById
);

export default router;
