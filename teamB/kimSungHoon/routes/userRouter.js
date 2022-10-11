const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);

router.get('/userPosting/:id', userController.userPosting);

router.post('/like', userController.like);

module.exports = {
    router 
};