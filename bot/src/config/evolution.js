const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

module.exports = {
  api: axios.create({
    baseURL: EVOLUTION_API_URL,
    headers: { 'apikey': EVOLUTION_API_KEY }
  })
};
