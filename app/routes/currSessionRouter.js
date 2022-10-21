const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/current-session", (req, res) => {
  console.log("curre-session");
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      res.send(false);
    } else {
      console.log("true", user);
      res.send(user);
    }
  })(req, res);
});

module.exports = router;
