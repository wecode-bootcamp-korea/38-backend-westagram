const express = require('express');
const postController = require('../controllers/postController');


const router = express.Router();

router.post('/post', postController.post);

module.exports = {
	router
}