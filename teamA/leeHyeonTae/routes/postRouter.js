const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();



router.post('/posting', postController.posts);
router.get('/search',postController.search);
router.get('/:id' ,  postController.specificPostSearch);

module.exports = {
    router
}