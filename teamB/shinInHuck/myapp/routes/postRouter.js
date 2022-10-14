const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/upload', postController.upload);
router.get('/viewallposts', postController.viewAllPosts);
router.get('/user/:userid', postController.viewUserId);

module.exports = {
  router
}