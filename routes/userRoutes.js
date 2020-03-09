const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

//Send data for new user
router.post("/signup", authController.signup);

//Send data for checking and logging in user
router.post("/login", authController.login);

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser); //.delete()

module.exports = router;