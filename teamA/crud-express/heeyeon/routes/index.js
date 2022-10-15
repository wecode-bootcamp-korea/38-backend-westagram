const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
router.use('/users', userRouter.router);

const postRouter = require('./postRouter');
router.use('/posts', postRouter.router);

const likesRouter = require('./likesRouter');
router.use('/likes', likesRouter.router);

module.exports = router;

