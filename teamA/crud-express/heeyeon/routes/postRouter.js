const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
router.post('', postController.post);
router.get('', postController.allPosts);
router.get('/:user_id', postController.onesPosts);
router.patch('/:post_id', postController.updatePost);
router.delete('/:post_id', postController.deletePost);

module.exports = {
    router
}
