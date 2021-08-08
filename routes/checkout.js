//This processes the order, currently only pushing items to orders table and emptying cart
const router = require("express").Router();
const checkout = require("../models/checkout-model");
const checkoutInstance = new checkout();

router.post("/", checkoutInstance.placeOrder);

module.exports = router;
