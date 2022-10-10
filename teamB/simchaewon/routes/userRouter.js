const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
//useerRouter의 router를 보내는 겨
router.post('/signup', userController.signUp);

module.exports = {
	router
}