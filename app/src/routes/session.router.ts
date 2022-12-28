import { Router } from "express";

import { getSession } from "../controllers/session.controller";

const router = Router();

router.get("/", getSession);

export default router;
