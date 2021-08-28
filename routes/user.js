//CRUD functionality for users account information
const router = require("express").Router();
const user = require("../models/user-models");
const userInstance = new user();

router.put("/", userInstance.updateUser);

router.delete("/", userInstance.deleteUser);

module.exports = router;
