const User = require("./models/user");
const LocalStrategy = require("passport-local");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log("test??");
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
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
