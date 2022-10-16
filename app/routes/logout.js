const router = require("express").Router();

router.post("/", (req, res, next) => {
  req.logOut();
  req.session = null;
  console.log("ses", req.session);

  res.send({ message: "Logout succes" });
});
module.exports = router;
