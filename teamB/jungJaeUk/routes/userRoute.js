const router = require("express").Router();

const userConPosts = require("../controllers/userConPosts");
const userConSignup = require("../controllers/userConSignup");

router.get("/:id/posts", userConPosts.posts);
router.post("/signup", userConSignup.signUp);

module.exports = { router };