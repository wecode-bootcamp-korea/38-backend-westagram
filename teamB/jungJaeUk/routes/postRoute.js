const router = require("express").Router();

const postController = require("../controllers/postController");

router.get("/all", postController.postsAll);
router.delete("/delete", postController.postsDelete);
router.post("/like", postController.postsLike);
router.patch("/update", postController.postsUpdate);
router.post("/", postController.postsAdd);

module.exports = { router };