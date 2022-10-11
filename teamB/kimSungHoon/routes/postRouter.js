const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/register', postController.createPost);

module.exports = {
    router 
};
