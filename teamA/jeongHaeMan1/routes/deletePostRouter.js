const express = require('express');
const deletePostController = require('../controllers/deletePostController');

const router = express.Router();

router.delete("/delete/:id", deletePostController.deletePost);

module.exports = {
    router
}