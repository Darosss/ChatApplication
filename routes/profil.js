const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, function (req, res) {
  User.findOne(
    { username: req.session.passport.user },
    function (err, foundUser) {
      res.render("profil", { userDetails: foundUser });
    }
  );
});

router.post("/", async (req, res, next) => {
  const filter = { username: req.session.passport.user };
  const update = {
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
  };
  try {
    await User.findOneAndUpdate(filter, update);
    res.redirect("profil");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
