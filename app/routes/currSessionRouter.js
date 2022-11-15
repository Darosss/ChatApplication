const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/", (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.send(false);
    } else {
      res.send(user);
    }
  })(req, res);
});

module.exports = router;
