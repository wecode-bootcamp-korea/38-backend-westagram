const express = require('express');
const router = express.Router();

const likesController = require('../controllers/likesController');
router.post('', likesController.pressLikes);

module.exports = {
    router
}