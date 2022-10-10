const express = require('express');
const router = express.Router();

const postRouter = require('./postRouter');
const likeRouter = require('./likeRouter');
router.use("/posts", postRouter.router);
router.use("/likes", likeRouter.router);
module.exports = router;