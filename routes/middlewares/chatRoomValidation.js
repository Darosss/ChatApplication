const isAdmin = require("./isAdmin");
module.exports = async function (chatRoom, username, userId) {
  if (chatRoom.createdBy === username || (await isAdmin(userId))) return true;
};
//If admin or owner of the room return true
