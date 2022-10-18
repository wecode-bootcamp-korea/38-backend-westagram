const express = require("express");
const router = express.Router();

const { likesController } = require('../controllers');     

router.post('', likesController.posting); 

module.exports = { router };