import { Router } from "express";
import isAdmin from "@/middlewares/isAdmin";
import { rangesController } from "../controllers/ranges.controller";
import isValidMongooseId from "@/middlewares/isValidMongooseId";

const router = Router();

router.get("/", rangesController.getListOfRanges);

router.get("/:_id/", isValidMongooseId, rangesController.getRangeById);

router.post("/admin/create", isAdmin, rangesController.createNewRange);

router.post(
  "/admin/edit/:_id/",
  isValidMongooseId,
  isAdmin,
  rangesController.editRangeById
);

router.delete(
  "/admin/delete/:_id/",
  isValidMongooseId,
  isAdmin,
  rangesController.deleteRangeById
);

export default router;
