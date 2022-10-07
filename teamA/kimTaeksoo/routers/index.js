const express = require("express");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/users", userRouter.router);

module.exports = router;
