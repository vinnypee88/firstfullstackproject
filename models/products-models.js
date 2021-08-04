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
  postItem = async (req, res) => {
    try {
      const { id, itemName, modelNumber, description, stock, price, image } =
        req.body;
      const addItem = await pool.query(
        "INSERT INTO item (id, item_name, model_number, description, stock, price, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [id, itemName, modelNumber, description, stock, price, image]
      );
      res.json(addItem.rows);
    } catch (error) {
      console.error(error);
    }
  };
  updateItem = async (req, res) => {
    try {
      const { id, itemName, modelNumber, description, stock, price, image } =
        req.body;
      const updateItem = await pool.query(
        "UPDATE item SET item_name = $1, model_number = $2, description = $3, stock = $4, price = $5, image = $6 WHERE id = $7 RETURNING *",
        [itemName, modelNumber, description, stock, price, image, id]
      );
      res.json(updateItem.rows);
    } catch (error) {
      console.error(error);
    }
  };
  deleteItem = async (req, res) => {
    const { id } = req.body;
    try {
      const deleteItem = await pool.query(
        "DELETE FROM item WHERE id = $1 RETURNING *",
        [id]
      );
      res.json(deleteItem.rows);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = products;
