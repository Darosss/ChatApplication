const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async function (req, res) {
  return res.send("PRIVATE ROUTE");
  // let user = req.session.passport.user;
  // let userDB = await User.findOne({ username: user.username }).populate(
  //   "ranges"
  // );

  // res.render("profil/profil", {
  //   userDetails: userDB,
  // });
});

router.post("/edit", async (req, res) => {
  let user,
    oldpassword = req.body.oldpassword,
    newpassword = req.body.newpassword;
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
    user = await User.findByIdAndUpdate(filter, update, { new: true });
    if (req.body.oldpassword)
      await changePassword(user, oldpassword, newpassword, update);

    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
});

async function changePassword(user, oldpassword, newpassword) {
  await user.comparePassword(oldpassword, async function (err, isMatch) {
    if (err) console.log(err);
    else if (isMatch) {
      user.password = newpassword;
      await user.save();
    } else {
      console.log("Cant change not same passwords");
    }
  });
}
module.exports = router;
