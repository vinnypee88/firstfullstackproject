const router = require("express").Router();
const products = require("../models/products-models");
const productsInstance = new products();

router.get("/", productsInstance.getItems);

router.get("/:id", productsInstance.getItem);

module.exports = router;
