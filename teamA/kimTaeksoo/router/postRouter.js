const express = require("express");
const postController = require("../controller/postController");

const router = express.Router();

router.post("/posting", postController.posting);
router.get("/all", postController.allPosts);
router.patch("/:postingId/users/:userId", postController.patchPosting);

module.exports = { router };
