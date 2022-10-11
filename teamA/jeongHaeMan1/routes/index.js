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


router.use("/users", userRouter.router); // 같은 동일 선상의 routes 폴더 안에 존재하고 있는 userRouter.js 내용이 안에 잘 정의되어 있는 router라는 모듈을 긁어서 불러와서 발동시킨다
router.use("/posts", postRouter.router);
router.use("/getposts", getPostRouter.router);
router.use("/selectuser", selectUserRouter.router);
router.use("/modifypost", modifyPostRouter.router);
router.use("/deletepost", deletePostRouter.router);
router.use("/likes", likesRouter.router);

module.exports = router;