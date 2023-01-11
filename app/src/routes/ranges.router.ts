import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import {
  createNewRange,
  deleteRangeById,
  editRangeById,
  getListOfRanges,
  getRangeById,
} from "../controllers/ranges.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

const router = Router();

router.get("/", getListOfRanges);

router.get("/:_id/", isValidMongooseId, getRangeById);

router.post("/admin/create", isAdmin, createNewRange);

router.post("/admin/edit/:_id/", isValidMongooseId, isAdmin, editRangeById);

router.delete(
  "/admin/delete/:_id/",
  isValidMongooseId,
  isAdmin,
  deleteRangeById
);

export default router;
