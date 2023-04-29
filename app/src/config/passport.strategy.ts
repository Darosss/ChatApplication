import { User } from "@/models/user";
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Error } from "mongoose";
import { UserModel, UserDocument } from "@types";
import { jwtSecretKey } from "./envVariables";

const localStrategy = new LocalStrategy(function (username, password, done) {
  try {
    User.findOne(
      { username: username },
      async function (err: Error, user: UserDocument) {
        if (err) return done(err);
        if (!user) return done(null, false);

        const samePassword = await user.comparePassword(password);
        if (!samePassword) return done(null, false);
        const userDetails = { id: user._id, username: user.username };
        return done(null, userDetails);
      }
    );
  } catch (err) {
    console.error(`Error occured while tyring to authenticate user`, err);
    throw err;
  }
});

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: (req) => req.session?.jwt,
    secretOrKey: jwtSecretKey,
  },
  async (payload, done) => {
    const user = await User.findOne(
      { username: payload.username },
      "_id administrator isBanned"
    );

    payload.id = user?._id;
    payload.administrator = user?.administrator;
    payload.isBanned = user?.isBanned;

    return done(null, payload);
  }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err: Error, user: UserModel) {
    return done(err, user);
  });
});
passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
