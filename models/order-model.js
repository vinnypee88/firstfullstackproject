const pool = require("../db/db");

class orders {
  getOrders = async (req, res) => {
    try {
      console.log(req.session);
      const userId = req.session.passport.user;
      console.log("getting orders");
      const getUserOrders = await pool.query(
        "SELECT * FROM orders WHERE users_id = $1",
        [userId]
      );
      res.json(getUserOrders.rows);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orders;
