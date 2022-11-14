module.exports = async function (req, res, next) {
  let userId = req.user.id;
  if (req.params.userId === userId.toString()) {
    return next();
  } else {
    res.status(403).send({ message: "You do not have permission" });
  }
};
