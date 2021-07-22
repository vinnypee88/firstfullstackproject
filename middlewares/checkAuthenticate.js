//middlewares to indicate what pages can be accessed

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { checkAuthenticated, checkNotAuthenticated };
