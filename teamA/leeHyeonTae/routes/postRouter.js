const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/posting', postController.posts);

module.exports = {
    router
}