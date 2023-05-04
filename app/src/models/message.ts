import { Model, model, Schema } from "mongoose";
import { MessageDocument } from "@types";

const messageSchema: Schema<MessageDocument> = new Schema({
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

export const Message: Model<MessageDocument> = model("Message", messageSchema);
