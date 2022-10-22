const express = require("express");
const router = express.Router();
const user = require("../models/user");
const range = require("../models/range");
const chatRoom = require("../models/chatRoom");

router.get("/", async (req, res) => {
  let users;
  try {
    users = await user.find({}, { password: 0, __v: 0 });
    res.send({ usersList: users });
  } catch {
    res.send({ message: "Can't get users" });
  }
});
//Get user by id
router.get("/:userId", async (req, res) => {
  const userEdit = await user.findById(req.params.userId, {
    password: 0,
    __v: 0,
    createdAt: 0,
  });
  const ranges = await range.find({});
  const chatRooms = await chatRoom.find({ createdBy: userEdit.id });
  res.send({
    user: userEdit,
    ranges: ranges,
    chatRooms: chatRooms,
  });
});

//Edit user by id route
router.post("/edit/:userId", async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.params.userId, req.body.userDetails);
    res.send({ message: "User edited" });
  } catch (e) {
    res.send({ message: "Can't edit user" });
    console.log(e);
  }
});
// //Ban user by id route
// router.post("/ban/:id", async (req, res) => {
//   let bannedDate = new Date();
//   let banExpiresDate = new Date();
//   let banMinutes = banExpiresDate.getMinutes() + parseInt(req.body.banTime);
//   banExpiresDate.setMinutes(banMinutes);

//   const update = {
//     isBanned: true,
//     bannedDate: bannedDate,
//     banExpiresDate: banExpiresDate,
//   };
//   try {
//     await user.findByIdAndUpdate(req.params.userId, update);
//     res.send({ message: "User banned" });
//   } catch (e) {
//     console.log(e);
//   }
// });
// //Unban user by id route
// router.post("/unban/:id", async (req, res) => {
//   const update = {
//     isBanned: false,
//   };
//   try {
//     await user.findByIdAndUpdate(req.params.userId, update);
//     res.send({ message: "User unbanned" });
//   } catch (e) {
//     console.log(e);
//   }
// });
module.exports = router;
