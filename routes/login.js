//handles logic to log in a user and create a session on passport.
const router = require("express").Router();
const pool = require("../db/db");
const authorize = require("../models/auth-models");
const authorizeInstance = new authorize();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json("This is the login page");
});

router.post("/", async function (req, res) {
  const { email, password } = req.body;
  const user = await authorizeInstance.getUserByEmail(email);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log(user);
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");

  try {
    const getUser = await pool.query(
      "SELECT id, first_name, last_name, email, address, date_of_birth FROM users WHERE id = $1",
      [id]
    );
    const getUsersCart = await pool.query(
      "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1",
      [id]
    );
    res.json({ userInfo: getUser.rows, userCart: getUsersCart.rows });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
