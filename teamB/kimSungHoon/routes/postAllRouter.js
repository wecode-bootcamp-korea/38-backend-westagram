const express = require('express');
const postAllController = require('../controllers/postAllController');

const router = express.Router();

router.get('/reading', postAllController.readingPost);

module.exports = {
    router 
};
