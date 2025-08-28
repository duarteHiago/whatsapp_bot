const express = require('express');
const webhookController = require('../controllers/webhook.controller');

const router = express.Router();

// Verificação do webhook (GET)
router.get('/', webhookController.verifyWebhook);

// Receber mensagens (POST)
router.post('/', (req, res) => {
  console.log('Recebi um POST no webhook:', JSON.stringify(req.body, null, 2));
  webhookController.receiveMessage(req, res);
});

module.exports = router;