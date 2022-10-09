const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("chatRoom", chatRoomSchema);
