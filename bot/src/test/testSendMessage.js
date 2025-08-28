require('dotenv').config({ path: '../../../.env' }); // Ajuste o caminho para o .env
const { sendText } = require('../methods/sendMessage');

(async () => {
  try {
    const number = '5566984450238';
    const text = 'Ola... isso eh um teste!';
    await sendText(number, text);
    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
  }
})();
