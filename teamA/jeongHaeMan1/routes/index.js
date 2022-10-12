//routes/index.js

const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const getPostRouter = require("./getPostRouter")
const selectUserRouter = require("./selectUserRouter");
const modifyPostRouter = require("./modifyPostRouter");
const deletePostRouter = require("./deletePostRouter");
const likesRouter = require("./likesRouter")


router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/getposts", getPostRouter.router);
router.use("/selectuser", selectUserRouter.router);
router.use("/modifypost", modifyPostRouter.router);
router.use("/deletepost", deletePostRouter.router);
router.use("/likes", likesRouter.router);

module.exports = router;