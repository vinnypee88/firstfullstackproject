//when add to cart is clicked, check auth middleware runs then product is entered into table cart in DB
//put (update) quantity of cart,
//read cart
const router = require("express").Router();
const cart = require("../models/cart-model");
const cartInstance = new cart();

router.get("/", cartInstance.getCart);

router.post("/", cartInstance.addToCart);

router.put("/", cartInstance.updateCart);

router.delete("/", cartInstance.removeFromCart);

module.exports = router;
