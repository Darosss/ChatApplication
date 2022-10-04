const express = require("express");
const router = express.Router();
const User = require("../models/user");
const chatRoom = require("../models/chatRoom");

router.get("/", async function (req, res) {
  let user = req.session.passport.user;
  console.log("sess", user);
  let userDB, chatRooms;
  userDB = await User.findOne({ username: user.username });
  chatRooms = await chatRoom.find({ createdBy: user.username });

  res.render("profil/profil", {
    userDetails: userDB,
    chatRooms: chatRooms,
  });
});

router.post("/edit", async (req, res) => {
  const filter = req.session.passport.user._id;
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
    await User.findByIdAndUpdate(filter, update);
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
