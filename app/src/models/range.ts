import { Model, model, Schema } from "mongoose";
import { RangeDocument } from "@types";

const rangeSchema: Schema<RangeDocument> = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
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
