const express = require("express");
const router = express.Router();
const chatRoom = require("../models/chatRoom");
const range = require("../models/range");
const dir = "chatrooms";
const chatRoomValidation = require("./partials/chatRoomValidation");

router.get("/", async (req, res) => {
  let user = req.session.passport.user,
    usersChatRooms;

  try {
    usersChatRooms = await chatRoom
      .find({ createdBy: user._id })
      .populate("createdBy")
      .populate("availableRanges");
  } catch (error) {
    console.log(error);
  }
  res.render(dir + "/index", {
    chatRooms: usersChatRooms,
  });
});

router.get("/create", async (req, res) => {
  const ranges = await range.find({});
  res.render(dir + "/create", { ranges: ranges });
});

//Create new chatroom
router.post("/create", async (req, res) => {
  let creatorName = req.session.passport.user._id;
  let name = req.body.name;
  let ranges = req.body.ranges;
  const room = new chatRoom({
    name: name,
    availableRanges: ranges,
    createdBy: creatorName,
  });
  try {
    await room.save();
    res.redirect("/");
  } catch (error) {
    console.log("Cannot create room", error);
  }
});

//Get chatroom by id
router.get("/edit/:id", async (req, res) => {
  let user = req.session.passport.user;
  const ranges = await range.find({});

  const chatRoomEdit = await chatRoom.findById(req.params.id);
  if (await chatRoomValidation(chatRoomEdit, user._id)) {
    res.render(dir + "/edit", {
      chatRoom: chatRoomEdit,
      ranges: ranges,
    });
  } else {
    res.redirect("/");
  }
});

//Edit chatroom by id route
router.post("/edit/:id", async (req, res) => {
  const update = {
    name: req.body.name,
    availableRanges: req.body.ranges,
  };
  try {
    await chatRoom.findByIdAndUpdate(req.params.id, update);

    res.redirect("/" + dir);
  } catch {}
});
//Remove chatroom route
router.delete("/edit/:id", async (req, res) => {
  let room;
  try {
    room = await chatRoom.findById(req.params.id);
    await room.remove();
    res.redirect("../../" + dir);
  } catch {
    res.redirect("back");
  }
});
module.exports = router;
