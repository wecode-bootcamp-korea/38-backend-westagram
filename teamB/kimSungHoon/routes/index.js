const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
router.use('/users', userRouter.router);

const postRouter = require('./postRouter');
router.use('/posts', postRouter.router);

const postAllRouter = require('./postAllRouter');
router.use('/postsAll', postAllRouter.router);

module.exports = router;