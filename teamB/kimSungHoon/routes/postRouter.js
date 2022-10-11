const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/register', postController.createPost);

router.get('/allReading', postController.readingPost);

router.patch('/update', postController.updatePost);

router.delete('/delete/:postId', postController.deletePost);

module.exports = {
    router 
};
