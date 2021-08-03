const router = require("express").Router();
const authorize = require("../models/auth-models");
const authorizeInstance = new authorize();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("This is the signup page");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheck = await authorizeInstance.getUserByEmail(email);
    if (!emailCheck) {
      const hashedPassword = await bcrypt.hash(password, 10);
      authorizeInstance.register(req.body, hashedPassword);
      res.send("/registersuccess");
    } else {
      res.send("/failure");
    }
  } catch (error) {}
});

module.exports = router;
