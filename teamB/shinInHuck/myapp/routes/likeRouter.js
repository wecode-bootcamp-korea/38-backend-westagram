const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post('/like', likeController.likeUp);

module.exports = {
  router
}