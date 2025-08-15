const express = require('express');
const webhookController = require('../controllers/webhook.controller');

const router = express.Router();

// Verificação do webhook (GET)
router.get('/', webhookController.verifyWebhook);

// Receber mensagens (POST)
router.post('/', webhookController.receiveMessage);

module.exports = router;