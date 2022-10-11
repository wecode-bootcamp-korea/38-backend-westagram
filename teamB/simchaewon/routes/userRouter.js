const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
//useerRouter의 router를 보내는 겨
router.post('/signup', userController.signUp);
router.get(`/history`, userController.readUserAllPosts);

module.exports = {
	router
}