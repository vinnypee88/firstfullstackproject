//CRUD operations on the users cart
const router = require("express").Router();
const cart = require("../models/cart-model");
const cartInstance = new cart();

router.get("/", cartInstance.getCart);

router.post("/", cartInstance.addToCart);

router.put("/", cartInstance.updateCart);

router.delete("/", cartInstance.removeFromCart);

module.exports = router;

//only jwt branch
