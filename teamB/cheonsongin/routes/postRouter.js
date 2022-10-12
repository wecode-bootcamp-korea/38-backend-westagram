const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/registration', postController.registration);
router.get('', postController.viewAllPosts);
router.put('/modification', postController.modification);
router.delete('/deletion', postController.deletion);

module.exports = {
  router
}