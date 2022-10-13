const express = require("express");
const router = express.Router();
const authenticateUser = require("./middlewares/authenticateUser");

router.post("/", authenticateUser, (req, res, next) => {
  console.log("kappa");
});

module.exports = router;
