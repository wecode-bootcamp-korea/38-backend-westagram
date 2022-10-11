const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/write', postController.write);

module.exports = {
    router
}