// retrieves order history for logged in user
const router = require("express").Router();
const orders = require("../models/order-model");
const ordersInstance = new orders();

router.get("/", ordersInstance.getOrders);

module.exports = router;
