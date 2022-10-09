const User = require("../../models/user");

module.exports = async function (req, res, next) {
  let userId = req.session.passport.user._id;
  let user = await User.findById(userId);

  if (!user.isBanned) return next();

  if (!checkBanDate(user.banExpiresDate)) res.redirect("/profil");
  else {
    unban(user);
    return next();
  }
};

var unban = async function (user) {
  user.isBanned = false;
  try {
    await user.save();
  } catch {}
};

var checkBanDate = function (banDate) {
  if (banDate - new Date() <= 0) return true;
};
