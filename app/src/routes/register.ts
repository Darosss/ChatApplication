import { Router } from "express";
import { register } from "../controllers/register.controller";
import isLoggedIn from "@/middlewares/isLoggedIn";

const router = Router();

router.post("/", isLoggedIn, register);

export default router;
