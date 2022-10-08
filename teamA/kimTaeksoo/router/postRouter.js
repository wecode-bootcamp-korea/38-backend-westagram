const express = require("express");
const postController = require("../controller/postController");

const router = express.Router();

router.post("/posting", postController.posting);

module.exports = { router };
