import { Model, model, Schema } from "mongoose";
import { IMessageDocument } from "@types";

const messageSchema: Schema<IMessageDocument> = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sentTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  whereSent: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "chatRoom",
  },
});

export const Message: Model<IMessageDocument> = model("Message", messageSchema);
