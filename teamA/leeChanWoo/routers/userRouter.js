const express = require("express");
const router = express.Router();

const { userController } = require('../controllers');      


router.post('', userController.signUp);  


module.exports = { router };
