const menuService = require('../services/menu.service');
const logger = require('../utils/logger');

class WebhookController {
  // Verificação do webhook (GET)
  verifyWebhook(req, res) {
    const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    logger.info(`Verificação webhook - Mode: ${mode}, Token recebido: ${token}`);

    if (mode && token === verifyToken) {
      logger.info('Webhook verificado com sucesso');
      res.status(200).send(challenge);
    } else {
      logger.error('Falha na verificação do webhook');
      res.status(403).send('Forbidden');
    }
  }

  // Receber mensagens (POST)
  async receiveMessage(req, res) {
    try {
      const body = req.body;
      logger.info('Webhook recebido:', JSON.stringify(body, null, 2));

      // UltraMessage
      if (body.event_type === 'message_received' && body.data) {
        const from = body.data.from.replace('@c.us', '');
        const text = body.data.body;
        await menuService.handleUserMessage(from, text);
        return res.status(200).send('EVENT_RECEIVED');
      }

      // WhatsApp Business API (original)
      if (body.object === 'whatsapp_business_account') {
        body.entry?.forEach(async (entry) => {
          entry.changes?.forEach(async (change) => {
            if (change.field === 'messages') {
              const messages = change.value.messages;
              
              if (messages) {
                for (const message of messages) {
                  await this.processMessage(message, change.value);
                }
              }
            }
          });
        });

        res.status(200).send('EVENT_RECEIVED');
      } else {
        res.status(404).send('Not Found');
      }
    } catch (error) {
      logger.error('Erro ao processar webhook:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async processMessage(message, value) {
    const from = message.from;
    const messageId = message.id;
    const timestamp = message.timestamp;

    logger.info(`Mensagem recebida de ${from}: ${JSON.stringify(message)}`);

    try {
      if (message.type === 'text') {
        // Mensagem de texto
        const text = message.text.body;
        await menuService.handleUserMessage(from, text);
        
      } else if (message.type === 'interactive') {
        // Resposta de botão
        const buttonId = message.interactive.button_reply.id;
        await menuService.handleUserMessage(from, null, buttonId);
        
      } else if (message.type === 'button') {
        // Resposta de botão (formato alternativo)
        const buttonId = message.button.payload;
        await menuService.handleUserMessage(from, null, buttonId);
      } else {
        logger.info(`Tipo de mensagem não suportado: ${message.type}`);
      }
      
    } catch (error) {
      logger.error(`Erro ao processar mensagem ${messageId}:`, error);
    }
  }
}

module.exports = new WebhookController();