module.exports = async function (req, res, next) {
  let userId = req.user.id;
  if (req.params.userId === userId) {
    return next();
  } else {
    res.send({ message: "You do not have permission" });
  }
};
