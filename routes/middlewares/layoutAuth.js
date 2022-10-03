module.exports = function (req) {
  if (req.isAuthenticated()) return "layouts/authenticated";
  return "layouts/layout";
};
