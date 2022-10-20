const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router();


router.post('/posting',likeController.like);

module.exports = {
    router
}