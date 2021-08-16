//middlewares to indicate what pages can be accessed

const jwt = require("jsonwebtoken");

const checkAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "vinod secret string", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkNotAuthenticated = (req, res, next) => {
  next();
};

module.exports = { checkAuthenticated, checkNotAuthenticated };
