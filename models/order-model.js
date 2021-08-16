const pool = require("../db/db");
const jwt = require("jsonwebtoken");

class orders {
  getOrders = async (req, res, next) => {
    try {
      const getUserOrders = await pool.query(
        "SELECT * FROM orders WHERE users_id = $1",
        [req.decodedToken.id]
      );
      res.json(getUserOrders.rows);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orders;
