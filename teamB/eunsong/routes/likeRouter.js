const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post('/user/:userId/post/:postId', likeController.likeUp);

module.exports = {
  router
}