//when add to cart is clicked, check auth middleware runs then product is entered into table cart in DB
//put (update) quantity of cart,
//read cart
const pool = require("../db/db");
const authorize = require("../models/auth-models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.send("hello this is your cart");
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    res.send("you have posted something to the cart");
  } catch (error) {
    console.error(error);
  }
});

router.put("/", async (req, res) => {
  try {
    res.send("you have updated something to the cart");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
