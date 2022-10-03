const express = require("express");
const router = express.Router();
const User = require("../models/user");
const chatRoom = require("../models/chatRoom");
const isLoggedIn = require("./middlewares/isLogedIn");

router.get("/", isLoggedIn, async function (req, res) {
  let user = req.session.passport.user;
  let userDB, chatRooms;
  // TODO later availalbe ranges from database for selection not input
  try {
    userDB = await User.findOne({ username: user });
    chatRooms = await chatRoom.find({ createdBy: user });
  } catch {}

  res.render("profil/profil", { userDetails: userDB, chatRooms: chatRooms });
});

router.post("/edit", async (req, res, next) => {
  const filter = { username: req.session.passport.user };
  const update = {
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
    country: req.body.country,
    gender: req.body.gender,
    nickColor: req.body.nickColor,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };
  try {
    await User.findOneAndUpdate(filter, update);
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
