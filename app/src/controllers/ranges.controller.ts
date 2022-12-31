import { Request, Response } from "express";
import { RequestUserAuth } from "@types";
import { Range } from "@/models/range";

export const getListOfRanges = async (req: Request, res: Response) => {
  let ranges;
  try {
    ranges = await Range.find({})
      .select({ __v: 0 })
      .populate("createdBy", "id username");
    res.send({ ranges: ranges });
  } catch (error) {
    res.send({ message: "Couldn't GET ranges" });
  }
};

export const createNewRange = async (req: RequestUserAuth, res: Response) => {
  const creatorId = req.user?.id;
  const name = req.body.name;
  const newRange = new Range({
    name: name,
    createdBy: creatorId,
  });
  try {
    await newRange.save();

    res.status(201).send({ message: "Created new range" });
  } catch (error) {
    res.status(400).send({ message: "Cannot create new range" });
  }
};

export const getRangeById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const rangeEdit = await Range.findById(_id, { __v: 0 });
  res.status(200).send({ range: rangeEdit });
};

export const editRangeById = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const update = {
    name: req.body.name,
  };
  try {
    await Range.findByIdAndUpdate(_id, update);

    res.send({ message: "Successfully updated range" });
  } catch (e) {
    res.send({ message: "Can't update range" });
    console.log(e);
  }
};

export const deleteRangeById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const rangeToDelete = await Range.findById(_id);

  try {
    rangeToDelete?.remove();
    res.send({ message: "Successfully deleted range" });
  } catch {
    res.send({ message: "Can't delete range" });
  }
};
