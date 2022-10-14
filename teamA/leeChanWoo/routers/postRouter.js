const express = require("express");
const router = express.Router();

const { posting, viewPost, viewUserPost, updatePost, deleting } = require('../controllers/postController');     


router.post('', postController.posting); 
router.get('', postController.viewPost);
router.get('/:userID', postController.viewUserPost);
router.patch('/:postID', postController.updatePost);
router.delete('/:postID', postController.deleting);

module.exports = { router };