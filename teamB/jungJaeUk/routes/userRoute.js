const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.get("/:id/posts", userController.posts);

module.exports = { router };