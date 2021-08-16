const pool = require("../db/db");

class cart {
  getCart = async (id) => {
    //get users current cart
    try {
      const getUsersCart = await pool.query(
        "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1 ORDER BY cart.item_id",
        [id]
      );
      return getUsersCart.rows;
    } catch (error) {
      console.error(error);
    }
  };
  addToCart = async (req, res) => {
    //add new products to cart
    const userId = req.decodedToken.id;

    const { itemId, quantity } = req.body; //these values will come from client side forms
    try {
      const checkIfItemInCart = await pool.query(
        "SELECT * FROM cart WHERE users_id = $1 AND item_id = $2",
        [userId, itemId]
      );
      if (checkIfItemInCart.rows.length !== 0) {
        const adjustQuantity = await pool.query(
          "UPDATE cart SET quantity = quantity+$1 WHERE users_id = $2 AND item_id = $3",
          [quantity, userId, itemId]
        );
        const getUsersCart = await pool.query(
          "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1 ORDER BY cart.item_id",
          [userId]
        );
        res.json(getUsersCart.rows);
      } else {
        const addToUsersCart = await pool.query(
          "INSERT INTO cart (users_id, item_id, quantity) VALUES ($1, $2, $3)",
          [userId, itemId, quantity]
        );
        const getUsersCart = await pool.query(
          "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1 ORDER BY cart.item_id",
          [userId]
        );
        res.json(getUsersCart.rows);
      }
    } catch (error) {
      console.error(error);
    }
  };
  updateCart = async (req, res) => {
    //update quantities in cart
    const userId = req.decodedToken.id;
    const { itemId, quantity } = req.body; //these values will come from client side forms, update quantities will be fron an incrementer button so only one quantity can be adjusted at once
    try {
      const updateQuantity = await pool.query(
        "UPDATE cart SET quantity = quantity-$1 WHERE users_id = $2 AND item_id = $3",
        [quantity, userId, itemId]
      );
      const getUsersCart = await pool.query(
        "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1 ORDER BY cart.item_id",
        [userId]
      );
      res.json(getUsersCart.rows);
    } catch (error) {
      console.error(error);
    }
  };
  removeFromCart = async (req, res) => {
    //remove items entirely from cart
    const userId = req.decodedToken.id;
    const { itemId } = req.body;
    try {
      const removeItem = await pool.query(
        "DELETE FROM cart WHERE users_id = $1 AND item_id = $2",
        [userId, itemId]
      );
      const getUsersCart = await pool.query(
        "SELECT cart.users_id, cart.item_id, cart.quantity, item.price, item.item_name, item.description FROM cart JOIN item ON cart.item_id=item.id WHERE users_id =$1 ORDER BY cart.item_id",
        [userId]
      );
      res.json(getUsersCart.rows);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = cart;
