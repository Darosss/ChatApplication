const user = require("../../models/user");
module.exports = async function (req, res, next) {
  let loggedUser = await user.findById(req.session.passport.user._id);
  console.log(
    "IS ADMIN in path[",
    req._parsedUrl.pathname,
    "]",
    loggedUser.administrator
  );
  if (loggedUser.administrator) return next();

  res.redirect("/");
  // if (req.session.passport.user.administrator) return next();
  // res.redirect("/");
};
