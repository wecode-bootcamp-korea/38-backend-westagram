const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
router.post('', postController.post);
router.get('', postController.allPosts);
router.get('/:user_id', postController.onesPosts);

module.exports = {
    router
}