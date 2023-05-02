import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { usersController } from "../controllers/users.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

const router = Router();

router.get("/", usersController.getListOfUsers);

router.get("/:_id", isValidMongooseId, usersController.getUserById);

router.get("/rooms/:_id", isValidMongooseId, usersController.getUsersRoomsById);

router.patch(
  "/admin/edit/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.editUserById
);

router.patch(
  "/admin/ban/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.banUserById
);

router.patch(
  "/admin/unban/:_id",
  isValidMongooseId,
  isAdmin,
  usersController.unbanUserById
);

export default router;
