const router = require("express").Router();

router.post("/", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log("err", err);
      return next(err);
    }
    res.send("Logged out");
  });
});
module.exports = router;
