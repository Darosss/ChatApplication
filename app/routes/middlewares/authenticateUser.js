const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) return res.status(200).send({ message: "Not found user" });

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
        next();
      }
    });
  })(req, res, next);
};
