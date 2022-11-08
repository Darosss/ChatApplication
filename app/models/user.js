const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    require: true,
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
  ranges: {
    type: Array,
    ref: "Range",
  },
  administrator: {
    type: Boolean,
    required: true,
    default: false,
  },
  moderator: {
    type: Boolean,
    required: true,
    default: false,
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
  isBanned: {
    type: Boolean,
  },
  bannedDate: {
    type: Date,
  },
  banExpiresDate: {
    type: Date,
  },
});
userSchema.plugin(passportLocalMongoose);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err, "??");
    }
    user.password = hash;
    next();
  });
});

userSchema.methods = {
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
};

module.exports = mongoose.model("User", userSchema);
