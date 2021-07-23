const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");

router.get("/", (req, res) => {
  res.send("This is the login page");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);

module.exports = router;