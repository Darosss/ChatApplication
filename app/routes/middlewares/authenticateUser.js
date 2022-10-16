const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) return res.redirect("/login");
    else {
      req.logIn(user, (er) => {
        if (err) throw err;
        if (user) {
          const userReturnObject = {
            username: user.username,
          };
          req.session.jwt = jwt.sign(
            userReturnObject,
            process.env.JWT_SECRET_KEY
          );
          res.send({ message: "Logged in!" });
          // res.status(201).json({
          //   message: "User successfully Logged in",
          //   user: user._id,
          // });
        }
      });
    }
  })(req, res, next);
};
