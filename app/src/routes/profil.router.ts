import { Router } from "express";
import isUsersProfile from "@/middlewares/isUsersProfile";

const router = Router();

import {
  editUserProfile,
  getUserProfile,
} from "../controllers/profil.controller";

router.get("/:userId", getUserProfile);

router.post("/:userId", isUsersProfile, editUserProfile);

export default router;
