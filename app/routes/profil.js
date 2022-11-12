const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isUsersProfile = require("./middlewares/isUsersProfile");

router.get("/:userId", async function (req, res) {
  let userDB = await User.findById(req.params.userId, {
    password: 0,
    __v: 0,
  }).populate("ranges");
  return res.send({ userDetails: userDB });
});

router.post("/:userId", isUsersProfile, async (req, res) => {
  let user,
    oldPassword = req.body.oldPassword,
    newPassword = req.body.newPassword;

  const filter = req.user.id;
  const update = {
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
    country: req.body.country,
    gender: req.body.gender,
    nickColor: req.body.nickColor,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber, //TODO: i changed here need to change in front
  };

  try {
    user = await User.findByIdAndUpdate(filter, update, { new: true });
    if (req.body.oldPassword)
      await changePassword(user, oldPassword, newPassword, update);

    res.status(201).send({ message: "Succesfully edited profile" });
  } catch (e) {
    res.status(400).send({ message: "Can't edit profile" });
  }
});

async function changePassword(user, oldPassword, newPassword) {
  await user.comparePassword(oldPassword, async function (err, isMatch) {
    if (err) console.log(err);
    else if (isMatch) {
      user.password = newPassword;
      await user.save();
    } else {
      console.log("Cant change not same passwords");
      //Todo later do as middleware to res.send(message: old password != same  )
    }
  });
}
module.exports = router;
