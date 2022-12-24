import { ArrayExpression, Model, model, Schema, Types } from "mongoose";

export interface IChatRoom {
  _id: Types.ObjectId;
  name: string;
  availableRanges: ArrayExpression;
  allowedUsers: ArrayExpression;
  bannedUsers: ArrayExpression;
  createdBy: Types.ObjectId;
}

const chatRoomSchema: Schema<IChatRoom> = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  availableRanges: {
    type: Array,
    required: true,
    ref: "Range",
  },
  allowedUsers: {
    type: Array,
    ref: "User",
  },
  bannedUsers: {
    type: Array,
    ref: "User",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const ChatRoom: Model<IChatRoom> = model("chatRoom", chatRoomSchema);
