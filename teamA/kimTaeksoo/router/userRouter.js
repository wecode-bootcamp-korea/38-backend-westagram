const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/signup", userController.signUp);
router.get("/:userId", userController.userIdMatchPosts);
router.post("/signin", userController.signIn);

module.exports = { router };
