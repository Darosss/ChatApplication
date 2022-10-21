const express = require("express");
const router = express.Router();
const chatRoom = require("../models/chatRoom");
const User = require("../models/user");
const range = require("../models/range");
const chatRoomValidation = require("./partials/chatRoomValidation");

router.get("/", async (req, res) => {
  let userId = req.user.id,
    usersChatRooms;
  console.log(req.user);
  try {
    usersChatRooms = await chatRoom
      .find({ createdBy: userId })
      .populate("createdBy", "_id username")
      .populate("availableRanges", "_id name");
  } catch (error) {
    console.log(error);
  }
  res.send({ usersRooms: usersChatRooms });
});

router.get("/create", async (req, res) => {
  const ranges = await range.find({});
  const users = await User.find({}, "_id username"); //TODO this add to method model user
  res.send({ availableRanges: ranges, usersList: users });
});

//Create new chatroom
router.post("/create", async (req, res) => {
  let createdBy = req.user;
  let name = req.body.roomName;
  let ranges = req.body.availableRanges;
  const room = new chatRoom({
    name: name,
    availableRanges: ranges,
    allowedUsers: req.body.allowedUsers,
    bannedUsers: req.body.bannedUsers,
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
  const ranges = await range.find({}, "_id name");
  const users = await User.find({}, "_id username"); //TODO this add to method model user
  const chatRoomEdit = await chatRoom.findById(req.params.roomId);
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
  console.log(req.params);
  let userId = req.user.id;
  const update = {
    name: req.body.roomName,
    availableRanges: req.body.availableRanges,
    allowedUsers: req.body.allowedUsers,
    bannedUsers: req.body.bannedUsers,
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

router.get("/delete/:roomId", async (req, res) => {
  await chatRoom.findById(req.params.roomId).then((room, err) => {
    res.send({ chatRoomDelete: room });
  });
});

// Remove chatroom route
router.delete("/delete/:roomId", async (req, res) => {
  let user = req.user;
  let room = await chatRoom.findById(req.params.roomId);
  try {
    if (await chatRoomValidation(room, user.id)) {
      await room.remove();
      res.send({ message: "Succesfully removed room" });
    } else {
      res.send({ message: "It's not your room" });
    }
  } catch {
    res.send({ message: "Can't remove room" });
  }
});
module.exports = router;
