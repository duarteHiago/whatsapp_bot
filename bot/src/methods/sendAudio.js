const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

exports.sendAudio = async (number, url) => {
  return axios.post(
    `${EVOLUTION_API_URL}/message/sendMedia/instance_01`,
    {
      number,
      mediaMessage: {
        type: "audio",
        url
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    }
  );
};

