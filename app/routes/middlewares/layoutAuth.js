const isAdmin = require("../partials/isAdmin");
module.exports = async function (req, res, next) {
  if (req.isAuthenticated()) {
    let userId = req.session.passport.user._id;
    if (await isAdmin(userId)) {
      req.app.locals.settings.layout = "layouts/administrator";
    } else {
      req.app.locals.settings.layout = "layouts/authenticated";
    }
    return next();
  }
  req.app.locals.settings.layout = "layouts/visitor";
  return next();
};
