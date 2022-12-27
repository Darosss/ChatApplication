import { Callback, model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";

import { IUserDocument } from "@types";

const userSchema: Schema<IUserDocument> = new Schema({
  username: {
    type: String,
    required: [true, "Can't be blank"],
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
  ranges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Range",
    },
  ],
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
  banReason: {
    type: String,
  },
});
userSchema.plugin(passportLocalMongoose);

userSchema.pre<IUserDocument>("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password as string, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: Callback
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err, "Not same password");
    cb(null, isMatch);
  });
};

export const User: Model<IUserDocument> = model("User", userSchema);
