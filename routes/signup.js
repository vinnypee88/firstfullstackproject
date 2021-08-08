//handles the logic to register a user,
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
      const register = await authorizeInstance.register(
        req.body,
        hashedPassword
      );
      if (!register) {
        res.json("Invalid entries");
      } else {
        return res.json(register.rows[0]);
      }
    } else {
      res.json("User already exists");
    }
  } catch (error) {}
});

module.exports = router;
