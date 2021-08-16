//handles logic to log in a user and create a session on passport.
const router = require("express").Router();
const authorize = require("../models/auth-models");
const authorizeInstance = new authorize();
const cart = require("../models/cart-model");
const cartInstance = new cart();

router.get("/", (req, res) => {
  res.json("This is the login page");
});

router.post("/", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await authorizeInstance.login(email, password);
    const usersCart = await cartInstance.getCart(user.id);
    const token = authorizeInstance.createToken(user.id);
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res.json([user, usersCart]);
  } catch (error) {
    console.log(error);
    res.json("Invalid Credentials");
  }
});

module.exports = router;
