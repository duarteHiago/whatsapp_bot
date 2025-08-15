const axios = require('axios');
const logger = require('../utils/logger'); // Adicione esta linha

const INSTANCE_ID = process.env.ULTRAMESSAGE_INSTANCE_ID;
const TOKEN = process.env.ULTRAMESSAGE_TOKEN;

class UltraMessageService {
  async sendTextMessage(to, message) {
    try {
      const response = await axios.post(
        `https://api.ultramsg.com/instance${INSTANCE_ID}/messages/chat?token=${TOKEN}`, // token na URL
        {
          to,
          body: message // UltraMsg espera o campo "body" para texto
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      logger.info('Resposta da UltraMsg:', response.data); // Veja o que retorna aqui
      return response.data;
    } catch (error) {
      logger.error('Erro ao enviar mensagem UltraMessage:', error.response?.data || error.message); // Log de erro
      throw error;
    }
  }
}

module.exports = new UltraMessageService();