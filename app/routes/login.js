const express = require("express");
const router = express.Router();
const authenticateUser = require("./middlewares/authenticateUser");

router.get("/login", authenticateUser, (req, res) => {
  console.log("test");
});

router.post("/", authenticateUser, (req, res, next) => {
  console.log("Logged in as", req.user);
  res.send(req.user);
});

module.exports = router;
