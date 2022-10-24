const router = require("express").Router();

router.post("/", (req, res, next) => {
  req.logOut();
  req.session = null;
  res.send({ message: "Logout succes" });
});
module.exports = router;
