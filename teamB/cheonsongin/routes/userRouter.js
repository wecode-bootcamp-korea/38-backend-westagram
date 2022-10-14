const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.get('/:userid', userController.viewUserId);


module.exports = {
  router
}