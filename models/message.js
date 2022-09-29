const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  whereSent: {
    type: String,
    required: true,
  },
  sentTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
