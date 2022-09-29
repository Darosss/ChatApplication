const express = require("express");
const router = express.Router();
const Message = require("../models/message");
// router.get("/", async (req, res) => {
//   if (!req.user) return res.redirect("/login");
//   let messages;
//   try {
//     messages = [];
//     messages = await Message.find({})
//       .sort({ createdAt: "desc" })
//       .limit(15)
//       .exec();
//   } catch {
//     messages = [];
//   }
//   res.render("index", { username: req.user.username });
// });
router.get("/", isLoggedIn, function (req, res) {
  res.render("index", { username: req.session.passport.user });

  console.log("session pass", req.session.passport);
});
function isLoggedIn(req, res, next) {
  console.log("IS LOGGED IN", req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}
// router.post("/", async (req, res) => {
//   const message = new Message({
//     message: req.body.message,
//     sender: "User1",
//   });
//   try {
//     const newMessage = await message.save();
//     console.log(newMessage);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;
