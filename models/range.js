const mongoose = require("mongoose");
const rangeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("range", rangeSchema);
