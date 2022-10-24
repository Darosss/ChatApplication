const isAdmin = require("../partials/_isAdminUser");
module.exports = async function (req, res, next) {
  let userId = req.user.id;
  if (await isAdmin(userId)) {
    return next();
  } else {
    res.send({ message: "You do not have permission" });
  }
};
