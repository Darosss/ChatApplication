const isAdmin = require("../partials/_isAdminUser");
const chatRoom = require("../../models/chatRoom");
module.exports = async function (req, res, next) {
  let roomId = req.params.roomId;
  let room = await chatRoom.findById(roomId);
  let userId = req.user.id;
  if (room.createdBy.toString() === userId || (await isAdmin(userId)))
    return next();
  else res.status(403).send({ message: "You are not owner of this room" });
};
