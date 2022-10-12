const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/write', postController.write);
router.get('/search', postController.search);
router.patch("/modify", postController.modify);
router.delete("/delete/:id", postController.deletePost);

module.exports = {
    router
}