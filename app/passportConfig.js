const User = require("./models/user");
const passport = require("passport");

const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
const localStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function (err, isMatch) {
      if (err) throw err;
      if (!isMatch) return done(null, false);
      const userDetails = { id: user.id, username: user.username };
      return done(null, userDetails);
    });
  });
});
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: (req) => req.session.jwt,
    secretOrKey: process.env.JWT_SECRET_KEY,
  },
  (payload, done) => {
    // TODO: add additional jwt token verification
    return done(null, payload);
  }
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
