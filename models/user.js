const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  firstname: {
    type: String,
  },
  surname: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  birthday: {
    type: Date,
    required: true,
  },
  range: {
    type: Array,
    required: true,
    default: "user",
  },
  country: {
    type: String,
  },
  gender: {
    type: String,
  },
  nickColor: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
