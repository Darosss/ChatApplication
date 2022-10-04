module.exports = function (req, res, next) {
  console.log(
    "IS LOGGED IN path[",
    req._parsedUrl.pathname,
    "]",
    req.isAuthenticated()
  );
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
};
