// methods/sendList.js
const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

/**
 * Envia uma lista interativa para um número via Evolution API
 * @param {string} number - Número do destinatário (ex: 5566984450238)
 * @param {Object} listData - Objeto contendo title, description, buttonText, footerText e sections
 */
exports.sendList = async (number, listData) => {
  const payload = { number, ...listData };

  return axios.post(
    `${EVOLUTION_API_URL}/message/sendList/instance_01`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    }
  );
};
