const express = require('express');
const postController = require('../controllers/postController');
const postCtrAll = require('../controllers/postCtrAll');

const router = express.Router();

router.post('/post', postController.post);
router.get('/all', postCtrAll.postAll);

module.exports = {
	router
}