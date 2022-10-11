const express = require('express');

const likesController = require('../controllers/likesController');

const router = express.Router();

router.post('/likes', likesController.likes);

module.exports = {
    router
}