import { model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";

import { UserDocument } from "@types";
import {
  birthdayValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from "../validators/userModel.validator";

const userSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    index: { unique: true },
    validate: usernameValidation,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    validate: passwordValidation,
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
    required: [true, "Birthday date is required"],
    validate: birthdayValidation,
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
    validate: emailValidation,
  },
  phone: {
    type: String,
    validate: phoneValidation,
  },
  isBanned: {
    type: Boolean,
    default: false,
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

userSchema.pre<UserDocument>("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password as string, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

export const User: Model<UserDocument> = model("User", userSchema);
