const express=require("express");
const likeController=require("../controllers/likeController");

const router = express.Router();

router.post("/heart",likeController.click);

module.exports={
    router
};