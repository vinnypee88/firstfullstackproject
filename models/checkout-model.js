const pool = require("../db/db");

class checkout {
  //this function needs to process the current cart and submit a new order

  placeOrder = async (req, res) => {
    const userId = req.session.passport.user;
    const currentDate = new Date();

    //first obtain cart Items
    const getCart = await pool.query("SELECT * FROM cart where users_id = $1", [
      userId,
    ]);
    const cartItems = await getCart.rows;

    //second Generate Order on orders Table and return newly generated id
    const generateOrder = await pool.query(
      "Insert into orders (users_id, date_of_order) VALUES ($1, $2) RETURNING id",
      [userId, currentDate]
    );
    const orderId = await generateOrder.rows[0].id;
    let cost = 0;
    //third Map through cart items and insert records into orders_items using orderId
    await cartItems.forEach((item) => {
      pool.query(
        "INSERT INTO orders_items (order_id, item_id, quantity) VALUES ($1,$2,$3)",
        [orderId, item.item_id, item.quantity]
      );
      //AND update quantities in Item table
      pool.query("UPDATE item SET stock = stock - $1 WHERE id = $2", [
        item.quantity,
        item.item_id,
      ]);
    });
    //fourth upon payment delete userscart
    const deleteCart = await pool.query(
      "DELETE FROM cart WHERE users_id = $1",
      [userId]
    );

    res.send("processed");
  };
}

module.exports = checkout;
