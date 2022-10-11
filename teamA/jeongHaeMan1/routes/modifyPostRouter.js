const express =  require('express');
const modifyPostController = require("../controllers/modifyPostController");

const router = express.Router();

router.patch("/modify", modifyPostController.modify);

module.exports = {
    router
}