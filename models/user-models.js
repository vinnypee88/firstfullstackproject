const pool = require("../db/db");

class user {
  updateUser = async (req, res) => {
    try {
      const id = req.decodedToken.id;
      const { firstName, lastName, address } = req.body;
      const updateUser = await pool.query(
        "UPDATE users SET first_name = $1, last_name = $2, address = $3 WHERE id = $4",
        [firstName, lastName, address, id]
      );
      const getUser = await pool.query(
        "SELECT id, first_name, last_name, email, address, date_of_birth FROM users WHERE id = $1",
        [id]
      );

      res.json(getUser.rows);
    } catch (error) {
      console.error(error);
    }
  };
  deleteUser = async (req, res) => {
    try {
      const id = req.decodedToken.id;
      const deleteUserCart = await pool.query(
        "DELETE FROM cart WHERE users_id = $1",
        [id]
      );
      const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);
      res.send("user deleted");
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = user;
