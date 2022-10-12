const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post('/signup', userController.signUp);

router.patch('/:userId/post/:postId', userController.updatePost);

module.exports = {
  router
}