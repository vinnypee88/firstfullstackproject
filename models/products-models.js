const pool = require("../db/db");

class products {
  getItems = async (req, res) => {
    try {
      const getItems = await pool.query("SELECT * FROM item");
      res.json(getItems.rows);
    } catch (error) {
      console.error(error);
    }
  };

  getItem = async (req, res) => {
    const { id } = req.params;
    try {
      const getItem = await pool.query("SELECT * FROM item WHERE id = $1", [
        id,
      ]);
      res.json(getItem.rows);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = products;
