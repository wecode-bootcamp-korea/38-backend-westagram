const express = require('express');
const router = express.Router();

const selectUserController = require('../controllers/selectUserController');

router.get('/getuser/:id', selectUserController.select);

module.exports = {
    router
}