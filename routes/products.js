const router = require("express").Router();
const products = require("../models/products-models");
const productsInstance = new products();

router.get("/", productsInstance.getItems);

router.get("/:id", productsInstance.getItem);

router.post("/", productsInstance.postItem);

router.put("/", productsInstance.updateItem);

router.delete("/", productsInstance.deleteItem);

module.exports = router;
