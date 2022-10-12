const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.get('/getuser/:id', userController.select);

module.exports = {
    router
}