const router = require("express").Router();

const userRouter = require("./userRoute");
const postRouter = require("./postRoute");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);

module.exports = router;