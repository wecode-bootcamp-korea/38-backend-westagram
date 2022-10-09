const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/upload', postController.upload);

module.exports = {
  router
}