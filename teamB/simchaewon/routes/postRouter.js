const express = require("express");
const postController=require("../controllers/postController");

const router=express.Router();
router.post("/upload", postController.upload);
router.get("/readall", postController.readall);
router.patch("/update", postController.update);
router.delete("/delete", postController.deletePost);

module.exports = { router };
