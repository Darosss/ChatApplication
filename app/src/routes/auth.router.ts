import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import authenticateUser from "@/middlewares/authenticateUser";
import isLoggedIn from "@/middlewares/isLoggedIn";

const router = Router();

router.post("/login", isLoggedIn, authenticateUser, authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
router.get("/session", authController.getSession);
export default router;
