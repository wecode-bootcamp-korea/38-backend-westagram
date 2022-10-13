const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post('', postController.postUp);

router.get('', postController.postsList);

router.get('/user/:userId', postController.postsListByUser);

router.delete('/:postId', postController.postDown);

module.exports = {
  router
}