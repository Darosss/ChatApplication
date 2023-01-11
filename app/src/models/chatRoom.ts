import { Model, model, Schema } from "mongoose";
import { IChatRoomDocument } from "@types";
import { nameValidation } from "../validators/roomModel.validator";

const chatRoomSchema: Schema<IChatRoomDocument> = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    index: { unique: true },
    validate: nameValidation,
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
    required: [true, "createdBy is required"],
    ref: "User",
  },
});

export const ChatRoom: Model<IChatRoomDocument> = model(
  "chatRoom",
  chatRoomSchema
);
