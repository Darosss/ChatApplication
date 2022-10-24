const isAdmin = require("../partials/_isAdminUser");
const chatRoom = require("../../models/chatRoom");
module.exports = async function (req, res, next) {
  let roomId = req.params.roomId;
  let room = chatRoom.findById(roomId);
  let userId = req.user.id;
  if ((await room.createdBy) === userId || (await isAdmin(userId)))
    return next();
  else res.send({ message: "You are not owner of this room" });
};
