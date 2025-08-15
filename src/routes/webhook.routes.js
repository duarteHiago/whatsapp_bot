const express = require('express');
const webhookController = require('../controllers/webhook.controller');

const router = express.Router();

// Verificação do webhook (GET)
router.get('/', webhookController.verifyWebhook);

// Receber mensagens (POST)
router.post('/', (req, res) => {
  console.log('Recebi um POST no webhook:', req.body);
  webhookController.receiveMessage(req, res);
});

module.exports = router;