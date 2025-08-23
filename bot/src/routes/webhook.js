const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/list', menuController.handleListMessage);

module.exports = router;
