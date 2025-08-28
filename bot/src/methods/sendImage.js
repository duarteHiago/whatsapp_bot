const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

exports.sendImage = async (number, url, caption, fileName = "Imagem.png") => {
  const payload = {
    number,
    mediatype: "image",
    mimetype: "image/png",
    caption,
    media: url,
    fileName
  };

  return axios.post(
    `${EVOLUTION_API_URL}/message/sendMedia/instance_01`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    }
  );
};
