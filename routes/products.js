const pool = require("../db/db");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const getItems = await pool.query("SELECT * FROM item");
    res.json(getItems.rows);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getItem = await pool.query("SELECT * FROM item WHERE id = $1", [id]);
    res.send(getItem.rows);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
