module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("is auth so lay auth");
    req.app.locals.settings.layout = "layouts/authenticated";
    return next();
  }

  console.log("is NOT auth so lay normal");
  req.app.locals.settings.layout = "layouts/layout";
  return next();
};
