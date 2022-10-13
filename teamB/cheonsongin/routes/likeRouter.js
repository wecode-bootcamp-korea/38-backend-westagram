const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('/:userid/:postid', likeController.likePost);

module.exports = {
  router
}