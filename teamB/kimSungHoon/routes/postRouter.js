const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.createPost);

router.get('/', postController.readingPost);

router.patch('/:postId', postController.updatePost);

router.delete('/:postId', postController.deletePost);

module.exports = {
    router 
};
