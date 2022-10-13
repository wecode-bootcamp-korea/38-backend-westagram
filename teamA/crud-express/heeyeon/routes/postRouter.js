const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
router.post('/posts', postController.post);

module.exports = {
    router
}