const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/", (req, res) => {
  console.log(req.headers.cookie, "test");
  console.log(req.headers, "headers");
  console.log(req.session, "kekew");
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.send(false);
    } else {
      res.send({ user, token: req.session.jwt });
    }
  })(req, res);
});

module.exports = router;
