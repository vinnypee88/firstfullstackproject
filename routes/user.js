//this should retrieve user information, allow user to update information, and delete account.
const router = require("express").Router();
const user = require("../models/user-models");
const userInstance = new user();

router.get("/:id", userInstance.getUser);

router.put("/:id", userInstance.updateUser);

router.delete("/:id", userInstance.deleteUser);

module.exports = router;
