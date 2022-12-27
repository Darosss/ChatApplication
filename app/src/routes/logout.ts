import { Router } from "express";
const router = Router();
import { logout } from "../controllers/logout.controller";

router.post("/", logout);

export default router;
