import { Model, model, Schema } from "mongoose";
import { IRangeDocument } from "@types";

const rangeSchema: Schema<IRangeDocument> = new Schema({
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

export const Range: Model<IRangeDocument> = model("Range", rangeSchema);
