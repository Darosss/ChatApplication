const isAdmin = require("../partials/isAdmin");
module.exports = async function (chatRoom, userId) {
  if ((await chatRoom.createdBy) == userId || (await isAdmin(userId)))
    return true;
};
//If admin or owner of the room return true
