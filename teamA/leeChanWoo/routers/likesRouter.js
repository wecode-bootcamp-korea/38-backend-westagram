const express = require("express");
const router = express.Router();

const likesController = require('../controllers/likesController');     

router.post('', likesController.posting); 

module.exports = { router };