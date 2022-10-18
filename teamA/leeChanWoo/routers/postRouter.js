const express = require("express");
const router = express.Router();

const { postController } = require('../controllers');     


router.post('', postController.posting); 
router.get('', postController.viewPost);
router.get('/:userID', postController.viewUserPost);
router.patch('/:postID', postController.updatePost);
router.delete('/:postID', postController.deleting);

module.exports = { router };