//CRUD functionality for users account information
const router = require("express").Router();
const user = require("../models/user-models");
const userInstance = new user();

// router.get("/", userInstance.getUser);

router.put("/:id", userInstance.updateUser);

router.delete("/:id", userInstance.deleteUser);

module.exports = router;
