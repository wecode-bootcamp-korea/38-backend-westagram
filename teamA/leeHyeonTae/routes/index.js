const express = require('express');
const router = express.Router();

const postRouter = require('./postRouter');
router.use("/posts", postRouter.router);
router.use('/get', )
module.exports = router;