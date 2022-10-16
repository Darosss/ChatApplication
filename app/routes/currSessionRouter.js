const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/current-session", (req, res) => {
  console.log("curre-session");
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      console.log(false);
      res.send(false);
    } else {
      console.log("true");
      console.log(req.session);
      res.send(user);
    }
  })(req, res);
});

module.exports = router;
