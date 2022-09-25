const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", async (req, res) => {
  // console.log(`[get]: user is authenticated, session is ${req.session.id}`);

  let messages;
  try {
    messages = [];
    messages = await Message.find({})
      .sort({ createdAt: "desc" })
      .limit(15)
      .exec();
  } catch {
    messages = [];
  }
  res.render("index", { messages: messages });
});

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
