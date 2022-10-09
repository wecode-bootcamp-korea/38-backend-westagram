//routes/index.js

const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter.router); // 같은 동일 선상의 routes 폴더 안에 존재하고 있는 userRouter.js 내용이 안에 잘 정의되어 있는 router라는 모듈을 긁어서 불러와서 발동시킨다

module.exports = router;