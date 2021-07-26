//this route will contain a post req which will submit an order and then reroute the user to its orderpage
const router = require("express").Router();
const checkout = require("../models/checkout-model");
const checkoutInstance = new checkout();

router.post("/", checkoutInstance.placeOrder);

module.exports = router;
