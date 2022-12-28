import { Model, model, Schema } from "mongoose";
import { IChatRoomDocument } from "@types";

const chatRoomSchema: Schema<IChatRoomDocument> = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  availableRanges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Range",
    },
  ],
  allowedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bannedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const ChatRoom: Model<IChatRoomDocument> = model(
  "chatRoom",
  chatRoomSchema
);
