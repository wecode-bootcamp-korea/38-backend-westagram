const express = require("express");
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);

module.exports = router;
