import { User, IUser } from "@/models/user";
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Error } from "mongoose";

const localStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err: Error, user: IUser) {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch: boolean) => {
      if (err) throw err;
      if (!isMatch) return done(null, false);
      const userDetails = { id: user._id, username: user.username };
      return done(null, userDetails);
    });
  });
});

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: (req) => req.session?.jwt,
    secretOrKey: process.env.JWT_SECRET_KEY,
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
  User.findById(id, function (err: Error, user: IUser) {
    return done(err, user);
  });
});
passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
