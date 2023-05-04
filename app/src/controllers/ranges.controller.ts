import { NextFunction, Request, Response } from "express";
import { RequestUserAuth } from "@types";
import { rangeService, RangeService } from "@/services/rangeService";
import { AppError } from "@/utils/ErrorHandler";

class RangesController {
  constructor(private readonly rangeService: RangeService) {}

  getListOfRanges = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ranges = await this.rangeService.getRangesList(
        {},
        { __v: 0 },
        { path: "createdBy", select: "id username" }
      );

      return res.status(200).send({ ranges: ranges });
    } catch (err) {
      return next(err);
    }
  };

  createNewRange = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    const creatorId = req.user?.id;

    try {
      if (!creatorId) throw new AppError(500, "Something went wrong");

      const newRange = await this.rangeService.createNewRange({
        name: req.body.name,
        createdBy: creatorId,
      });

      return res
        .status(201)
        .send({ message: "Created new range", range: newRange });
    } catch (err) {
      return next(err);
    }
  };

  getRangeById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      const range = await this.rangeService.getRangeById(_id, { __v: 0 });

      return res.status(200).send({ range: range });
    } catch (err) {
      return next(err);
    }
  };

  editRangeById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    try {
      const editedRange = await this.rangeService.upadeRangeById(_id, {
        name: req.body.name,
      });

      return res
        .status(200)
        .send({ message: "Successfully edited range", range: editedRange });
    } catch (err) {
      return next(err);
    }
  };

  deleteRangeById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      this.rangeService.removeRangeById(_id);
      return res.status(200).send({ message: "Successfully deleted range" });
    } catch (err) {
      return next(err);
    }
  };
}

export const rangesController = new RangesController(rangeService);
