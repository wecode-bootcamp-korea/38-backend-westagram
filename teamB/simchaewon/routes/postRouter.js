const express = require("express");
const postController=require("../controllers/postController");

const router=express.Router();
router.post("/upload", postController.upload);
router.get("/readall", postController.readall);

module.exports = { router };
