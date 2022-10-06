const isAdmin = require("./isAdmin");
module.exports = async function (req, res, next) {
  let userId = req.session.passport.user._id;
  if (await isAdmin(userId)) {
    return next();
  } else {
    res.redirect("/");
  }
};
