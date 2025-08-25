const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Aqui você coloca os router.post
router.post('/sendText', menuController.handleSendText);
router.post('/sendImage', menuController.handleSendImage);
router.post('/sendDocument', menuController.handleSendDocument);
router.post('/sendAudio', menuController.handleSendAudio);
router.post('/sendList', menuController.handleSendList);

module.exports = router;

