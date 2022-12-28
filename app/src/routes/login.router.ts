import { Router } from "express";
import { login } from "../controllers/login.controller";
import authenticateUser from "@/middlewares/authenticateUser";
import isLoggedIn from "@/middlewares/isLoggedIn";

const router = Router();

router.post("/", authenticateUser, isLoggedIn, login);

export default router;
