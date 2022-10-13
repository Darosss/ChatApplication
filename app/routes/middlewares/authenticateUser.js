const passport = require("passport");
module.exports = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user");
    else {
      req.logIn(user, (er) => {
        if (err) throw err;
        console.log("Logged in user: ", req.user);
        res.send(req.user);
      });
    }
  })(req, res, next);
};
