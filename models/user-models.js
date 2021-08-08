const pool = require("../db/db");

class user {
  // getUser = async (req, res) => {
  //   //The logged in user can only access their user information
  //   const id = req.session.passport.user;
  //   try {
  //     const getUser = await pool.query(
  //       "SELECT id, first_name, last_name, email, address, date_of_birth FROM users WHERE id = $1",
  //       [id]
  //     );
  //     res.json(getUser.rows);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  updateUser = async (req, res) => {
    try {
      if (req.body.id != req.params.id) {
        return res.redirect("/login");
      }

      const id = req.session.passport.user;
      const { first_name, last_name, email, address, date_of_birth } = req.body;
      const updateUser = await pool.query(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, date_of_birth = $5 WHERE id = $6",
        [first_name, last_name, email, address, date_of_birth, id]
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
      if (req.body.id != req.params.id) {
        return res.redirect("/login");
      }
      const id = req.session.passport.user;
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
