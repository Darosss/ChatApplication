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

//Create new range
router.post("/create", isAdmin, createNewRange);

//Get range by id
router.get("/:id/", isAdmin, getRangeById);

//Edit range by id route
router.post("/edit/:id/", isAdmin, editRangeById);

//Remove range route
router.delete("/delete/:id/", isAdmin, deleteRangeById);

export default router;
