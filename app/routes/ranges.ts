import express, { Request, Response } from "express";
import { RequestUserAuth } from "../@types/types";
import { Range } from "../models/range";
import isAdmin from "../routes/middlewares/isAdmin";

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  let ranges;
  try {
    ranges = await Range.find({})
      .select({ __v: 0 })
      .populate("createdBy", "id username");
  } catch (error) {
    console.log("Error get ranges", error);
  }
  res.send({ ranges: ranges });
});

//Create new range
router.post("/create", isAdmin, async (req: RequestUserAuth, res: Response) => {
  const creatorId = req.user?.id;
  const name = req.body.name;
  const newRange = new Range({
    name: name,
    createdBy: creatorId,
  });
  try {
    await newRange.save();
    // console.log("Created new range");
    res.status(201).send({ message: "Created new range" });
  } catch (error) {
    res.status(400).send({ message: "Cannot create new range" });
    // console.log("Cannot create range", error);
  }
});

//Get range by id
router.get("/:id/", isAdmin, async (req: Request, res: Response) => {
  const rangeEdit = await Range.findById(req.params.id, { __v: 0 });
  res.status(200).send({ range: rangeEdit });

  //TODO try
});

//Edit range by id route
router.post("/edit/:id/", isAdmin, async (req: Request, res: Response) => {
  const update = {
    name: req.body.name,
  };
  try {
    await Range.findByIdAndUpdate(req.params.id, update);

    res.send({ message: "Successfully updated range" });
  } catch (e) {
    res.send({ message: "Can't update range" });
    console.log(e);
  }
});

//Remove range route
router.delete("/delete/:id/", isAdmin, async (req: Request, res: Response) => {
  try {
    await Range.findById(req.params.id).then(async (range) => {
      await range?.remove();
    });
    res.send({ message: "Successfully deleted range" });
  } catch {
    res.send({ message: "Can't delete range" });
  }
});

export default router;
