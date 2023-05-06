import { Model, model, Schema } from "mongoose";
import { RangeDocument } from "@types";
import { nameValidation } from "../validators/rangeModel.validator";

const rangeSchema: Schema<RangeDocument> = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    validate: nameValidation,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Range: Model<RangeDocument> = model("Range", rangeSchema);
