const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstname = req.body.firstname;
  let surname = req.body.surname;
  let birthday = req.body.birthday;
  let country = req.body.country;
  let gender = req.body.gender;
  let nickColor = req.body.nickColor;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  User.register(
    new User({
      username: username,
      firstname: firstname,
      password: password,
      surname: surname,
      birthday: birthday,
      country: country,
      gender: gender,
      nickColor: nickColor,
      email: email,
      phoneNumber: phoneNumber,
    }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("profil");
      });
    }
  );
});

module.exports = router;
