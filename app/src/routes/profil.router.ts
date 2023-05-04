import { Router } from "express";
import { profilController } from "../controllers/profil.controller";

const router = Router();

router.get("/", profilController.getUserProfile);

router.patch("/edit", profilController.editUserProfile);

export default router;
