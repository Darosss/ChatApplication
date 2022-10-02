const express = require("express");
const router = express.Router();
const chatRoom = require("../models/chatRoom");
const prefixName = "chat-";
router.get("/", (req, res) => {
  res.render("chatroom/create");
});

router.post("/", async (req, res) => {
  if (req.body.name.length <= 0) res.redirect("/chatroom");
  let creatorName = req.session.passport.user;
  let name = prefixName + req.body.name;
  let ranges = req.body.ranges.split(",");
  ranges.push(creatorName);
  const room = new chatRoom({
    name: name,
    availableRanges: ranges,
    createdBy: creatorName,
  });
  try {
    const newRoom = await room.save();
    res.redirect("/");
  } catch {
    console.log("Cannot create room");
  }
});

module.exports = router;
