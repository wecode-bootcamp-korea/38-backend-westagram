const express = require('express');
const postController = require('../controllers/postController');
const searchPostController = require('../controllers/searchPostController');
const specificSearchPostController = require('../controllers/specificSearchPostController.js');
const updatePostController = require('../controllers/updatePostController');
const deletePostController = require('../controllers/deletePostController');

const router = express.Router();


router.post('/posting', postController.posts);
router.put('/update', updatePostController.update);
router.get('/search',searchPostController.search);
router.delete('/delete/:id',deletePostController.deletes);
router.get('/:id' ,  specificSearchPostController.specificPostSearch);

module.exports = {
    router
}