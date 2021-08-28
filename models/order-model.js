const pool = require("../db/db");
const jwt = require("jsonwebtoken");

class orders {
  getOrders = async (req, res, next) => {
    try {
      const getUserOrders = await pool.query(
        "select * from orders where users_id = $1",
        [req.decodedToken.id]
        // "select orders_items.order_id, orders_items.item_id, orders_items.quantity, orders.users_id, item.item_name from orders_items join orders ON orders_items.order_id = orders.id join item ON item.id = orders_items.item_id where users_id = $1 order by order_id",
        // [req.decodedToken.id]
      );
      res.json(getUserOrders.rows);
    } catch (error) {
      console.log(error);
    }
  };
  getOrderDetails = async (req, res, next) => {
    try {
      const getOrders = await pool.query(
        "select orders_items.order_id, orders_items.item_id, orders_items.quantity, item.item_name, item.price, item.description from orders_items join item on orders_items.item_id = item.id where order_id = $1;",
        [req.body.orderId]
      );
      res.json(getOrders.rows);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orders;
