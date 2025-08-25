const axios = require('axios');

async function sendMessage(instanceName, apiKey, number, text) {
  try {
    const response = await axios.post(
      `http://localhost:8080/message/sendText/${instanceName}`,
      {
        number: number,
        textMessage: {
          text: text
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey
        }
      }
    );

    console.log('Mensagem enviada com sucesso:', response.data);
    return response.data;

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = sendMessage;
