const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log("err", err);
      return next(err);
    }
    res.redirect("/login");
  });
});
module.exports = router;
