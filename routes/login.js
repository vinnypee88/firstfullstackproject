//handles logic to log in a user and create a session on passport.
const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");
const pool = require("../db/db");

router.get("/", (req, res) => {
  res.json("This is the login page");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/failed",
    failureFlash: true,
  }),
  async function (req, res) {
    const id = req.session.passport.user;
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
  }
);

module.exports = router;
