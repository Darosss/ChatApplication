const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sentTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  whereSent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "chatRoom",
  },
});

module.exports = mongoose.model("Message", messageSchema);
