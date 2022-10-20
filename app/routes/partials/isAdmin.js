const user = require("../../models/user");

module.exports = async function (userId) {
  let loggedUser = await user.findById(userId);
  if (loggedUser.administrator) return true;
};
