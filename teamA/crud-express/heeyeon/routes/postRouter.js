const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
router.post('/post', postController.post);
router.get('/allPosts', postController.allPosts);

module.exports = {
    router
}