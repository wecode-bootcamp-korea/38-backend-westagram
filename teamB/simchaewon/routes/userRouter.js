const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/history', userController.readUserAllPosts);

module.exports = {
	router
}