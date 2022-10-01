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
  },
});

module.exports = mongoose.model("chatRoom", chatRoomSchema);
