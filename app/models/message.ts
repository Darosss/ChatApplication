import { ArrayExpression, Model, model, Schema, Types } from "mongoose";

export interface IMessage {
  _id: string;
  message: string;
  sender: ArrayExpression;
  sentTime: Date;
  whereSent: Types.ObjectId;
}

const messageSchema: Schema<IMessage> = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Types.ObjectId,
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

export const Message: Model<IMessage> = model("Message", messageSchema);
