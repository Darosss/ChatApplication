const user = require("../../models/user");

module.exports = async function (userId) {
  let loggedUser = await user.findById(userId);
  console.log("checking", loggedUser.username);
  if (loggedUser.administrator) return true;
};
