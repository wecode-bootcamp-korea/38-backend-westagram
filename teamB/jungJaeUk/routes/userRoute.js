const router = require("express").Router();

const userConSignup = require("../controllers/userConSignup");
const userConPosts = require("../controllers/userConPosts");

router.post("/signup", userConSignup.signUp);
router.get("/:id/posts", userConPosts.posts);

module.exports = { router };