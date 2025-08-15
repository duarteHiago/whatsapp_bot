const axios = require('axios');
const logger = require('../utils/logger');

class WhatsAppService {
  constructor() {
    this.baseURL = 'https://graph.facebook.com/v17.0';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  }

  async sendInteractiveMenu(to, menuData) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: menuData.message
          },
          action: {
            buttons: menuData.buttons.map(btn => ({
              type: 'reply',
              reply: {
                id: btn.id,
                title: btn.title
              }
            }))
          }
        }
      };

      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info(`Menu enviado para ${to}: ${menuData.message}`);
      return response.data;
    } catch (error) {
      logger.error('Erro ao enviar menu:', error.response?.data || error.message);
      throw error;
    }
  }

  async sendTextMessage(to, message) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: message
        }
      };

      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info(`Mensagem enviada para ${to}`);
      return response.data;
    } catch (error) {
      logger.error('Erro ao enviar mensagem:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new WhatsAppService();