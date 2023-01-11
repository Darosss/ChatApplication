import { Router } from "express";
import {
  editUserProfile,
  getUserProfile,
} from "../controllers/profil.controller";

const router = Router();

router.get("/", getUserProfile);

router.post("/edit", editUserProfile);

export default router;
