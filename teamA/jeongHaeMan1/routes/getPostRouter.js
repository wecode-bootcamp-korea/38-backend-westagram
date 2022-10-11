const express = require('express');
const getPostController = require('../controllers/getPostController');

const router = express.Router();

router.get('/search', getPostController.search);

module.exports = {
    router
}