const pool = require("../db/db");
const jwt = require("jsonwebtoken");

class orders {
  getOrders = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      if (token) {
        jwt.verify(token, "vinod secret string", async (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.redirect("/login");
          } else {
            const getUserOrders = await pool.query(
              "SELECT * FROM orders WHERE users_id = $1",
              [decodedToken.id]
            );
            res.json(getUserOrders.rows);
          }
        });
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orders;
