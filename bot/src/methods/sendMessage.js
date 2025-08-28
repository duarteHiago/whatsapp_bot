const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

exports.sendText = async (number, text) => {
  return axios.post(
    `${EVOLUTION_API_URL}/message/sendText/instance_01`,
    {
      number,
      text // Mudança: enviar "text" diretamente, sem o objeto "textMessage"
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    }
  );
};
