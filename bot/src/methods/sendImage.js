const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

exports.sendImage = async (number, url, caption) => {
  return axios.post(
    `${EVOLUTION_API_URL}/message/sendMedia/instance_01`,
    {
      number,
      mediaMessage: {
        type: "image",
        url,
        caption
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

