const User = require("../../models/user");

module.exports = async function (req, res, next) {
  let userId = req.user.id;
  let user = await User.findById(userId);

  if (!user.isBanned) {
    return next();
  } else {
    res
      .status(403)
      .send({ message: "You are banned", banDate: user.banExpiresDate });
  }
};
