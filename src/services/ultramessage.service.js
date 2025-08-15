const axios = require('axios');

const INSTANCE_ID = process.env.ULTRAMESSAGE_INSTANCE_ID;
const TOKEN = process.env.ULTRAMESSAGE_TOKEN;

class UltraMessageService {
  async sendTextMessage(to, message) {
    try {
      const response = await axios.post(
        `https://api.ultramessage.com.br/instance${INSTANCE_ID}/send/text`,
        {
          to, // Ex: '5511999999999'
          text: message
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new UltraMessageService();