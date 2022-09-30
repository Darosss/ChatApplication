module.exports = function (req, res, next) {
  console.log("IS LOGGED IN", req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
};
