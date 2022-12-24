import mongoose, { Model, model, Schema, Types } from "mongoose";

export interface IRange {
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const rangeSchema: Schema<IRange> = new Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Range: Model<IRange> = model("Range", rangeSchema);
