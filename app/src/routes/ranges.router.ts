import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import {
  createNewRange,
  deleteRangeById,
  editRangeById,
  getListOfRanges,
  getRangeById,
} from "../controllers/ranges.controller";

const router = Router();

router.get("/", getListOfRanges);

router.get("/:id/", getRangeById);

router.post("/admin/create", isAdmin, createNewRange);

router.post("/admin/edit/:id/", isAdmin, editRangeById);

router.delete("/admin/delete/:id/", isAdmin, deleteRangeById);

export default router;
