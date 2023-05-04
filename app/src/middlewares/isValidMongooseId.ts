import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default function isValidMongooseId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { _id } = req.params;
  if (isValidObjectId(_id)) return next();

  res.status(400).send({ message: `${_id} is not proper id` });
}
