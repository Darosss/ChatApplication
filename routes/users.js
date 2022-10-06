const express = require("express");
const router = express.Router();
const user = require("../models/user");
const range = require("../models/range");
const chatRoom = require("../models/chatRoom");
const dir = "users";
router.get("/", async (req, res) => {
  let users;
  try {
    users = await user.find({});
  } catch (error) {}
  res.render(dir + "/index", {
    users: users,
  });
});

//Get user by id
router.get("/edit/:id", async (req, res) => {
  const userEdit = await user.findById(req.params.id);
  const ranges = await range.find({});
  const chatRooms = await chatRoom.find({ createdBy: userEdit.username });
  res.render(dir + "/edit", {
    user: userEdit,
    ranges: ranges,
    chatRooms: chatRooms,
  });
});

//Edit range by id route
router.post("/edit/:id", async (req, res) => {
  const update = {
    username: req.body.name,
    ranges: req.body.ranges,
  };
  try {
    await user.findByIdAndUpdate(req.params.id, update);
    res.redirect("/" + dir);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
