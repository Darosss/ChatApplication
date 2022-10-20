const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("Register site");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let userData = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
    country: req.body.country,
    gender: req.body.gender,
    nickColor: req.body.nickColor,
    email: req.body.email,
    phoneNumber: req.body.phone,
  };
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exist");
    if (!doc) {
      const newUser = new User(userData);
      await newUser.save();
    }
  });
  res.send("Account created");
});

module.exports = router;
