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
  const body = req.body;
  const update = {
    username: body.username,
    firstname: body.firstname,
    surname: body.surname,
    country: body.country,
    gender: body.gender,
    nickColor: body.nickColor,
    email: body.email,
    phoneNumber: body.phoneNumber,
    ranges: body.ranges,
  };
  try {
    await user.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User edited" });
  } catch (e) {
    res.send({ message: "Can't edit user" });
    console.log(e);
  }
});

//Ban user by id route
router.post("/ban/:userId/", async (req, res) => {
  let banTime = req.body.banTime;
  if (!banTime) banTime = 5;

  let bannedDate = new Date(),
    banExpiresDate = new Date();
  let banMinutes = banExpiresDate.getMinutes() + parseInt(banTime);
  banExpiresDate.setMinutes(banMinutes);

  const update = {
    isBanned: true,
    bannedDate: bannedDate,
    banExpiresDate: banExpiresDate,
  };
  try {
    await user.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User banned" });
  } catch (e) {
    //Fe. add validation if admin want to ban admin or sth like that
    res.send({ message: "User can't be banned" });
  }
});

//Unban user by id route
router.post("/unban/:userId", async (req, res) => {
  const update = {
    isBanned: false,
  };
  try {
    await user.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User unbanned" });
  } catch (e) {
    res.send({ message: "User can't be unbanned" });
    console.log(e);
  }
});
module.exports = router;
