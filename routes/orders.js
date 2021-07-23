//this route will retrieve a users order history if authenticated
//will need to only allow access to the order belonging to the user that is logged in.
const router = require("express").Router();
const orders = require("../models/order-model");
const ordersInstance = new orders();

router.get("/", ordersInstance.getOrders);

module.exports = router;
