const express = require("express");
const router = express.Router();
const chatRoom = require("../models/chatRoom");
const User = require("../models/user");
const range = require("../models/range");
const chatRoomValidation = require("./partials/chatRoomValidation");

router.get("/", async (req, res) => {
  let userId = req.user.id,
    usersChatRooms;
  try {
    usersChatRooms = await chatRoom
      .find({ createdBy: userId })
      .populate("createdBy")
      .populate("availableRanges");
  } catch (error) {
    console.log(error);
  }
  res.send({ usersRooms: usersChatRooms });
});

router.get("/create", async (req, res) => {
  const ranges = await range.find({});
  const users = await User.find({});
  res.send({ availableRanges: ranges });
});

//Create new chatroom
router.post("/create", async (req, res) => {
  let createdBy = req.user;
  let name = req.body.roomName;
  let ranges = req.body.availableRanges;
  const room = new chatRoom({
    name: name,
    availableRanges: ranges,
    // allowedUsers: req.body.allowedUsers,
    // bannedUsers: req.body.bannedUsers,
    createdBy: createdBy.id,
  });
  try {
    await room.save();
    res.send({ message: "Room created succesfully!" });
  } catch (error) {
    res.send({ message: "Cannot create room!" });
  }
});

//Get chatroom by id
router.get("/:roomId", async (req, res) => {
  let user = req.user;
  const ranges = await range.find({});
  const users = await User.find({}, "_id username"); //TODO this add to method model user
  const chatRoomEdit = await chatRoom
    .findById(req.params.roomId)
    .populate("allowedUsers")
    .populate("bannedUsers");
  if (await chatRoomValidation(chatRoomEdit, user.id)) {
    res.send({
      chatRoom: chatRoomEdit,
      availableRanges: ranges,
      usersList: users,
    });
  } else {
    res.send({ message: "You are not owner or admin to edit that room." });
  }
});

//Edit chatroom by id route
router.post("/:roomId", async (req, res) => {
  const update = {
    name: req.body.roomName,
    availableRanges: req.body.availableRanges,
    // allowedUsers: req.body.allowedUsers,
    // bannedUsers: req.body.bannedUsers,
  };
  try {
    await chatRoom.findByIdAndUpdate(req.params.roomId, update).then(() => {
      res.send({ message: "Successfully edited room" });
    });
  } catch (err) {
    res.send({ message: "Can't edit room" });
    console.log(err);
  }
});
//Remove chatroom route
// router.delete("/edit/:id", async (req, res) => {
//   let room;
//   try {
//     room = await chatRoom.findById(req.params.id);
//     await room.remove();
//     res.redirect("../../" + dir);
//   } catch {
//     res.redirect("back");
//   }
// });
module.exports = router;
