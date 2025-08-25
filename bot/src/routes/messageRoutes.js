const express = require('express');
const router = express.Router();

const sendMessage = require('../methods/sendMessage'); // aqui o arquivo é sendMessage.js
const sendImage = require('../methods/sendImage');
const sendAudio = require('../methods/sendAudio');
const sendDocument = require('../methods/sendDocument');
const sendList = require('../methods/sendList');

router.post('/send-text', async (req, res) => {
  try {
    const { number, text } = req.body;
    await sendMessage(number, text); // aqui você chama a função sendMessage
    res.json({ success: true, message: 'Texto enviado!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar texto' });
  }
});

// as outras rotas continuam iguais
router.post('/send-image', async (req, res) => {
  try {
    const { number, url, caption } = req.body;
    await sendImage(number, url, caption);
    res.json({ success: true, message: 'Imagem enviada!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar imagem' });
  }
});

router.post('/send-audio', async (req, res) => {
  try {
    const { number, url } = req.body;
    await sendAudio(number, url);
    res.json({ success: true, message: 'Áudio enviado!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar áudio' });
  }
});

router.post('/send-document', async (req, res) => {
  try {
    const { number, url, filename } = req.body;
    await sendDocument(number, url, filename);
    res.json({ success: true, message: 'Documento enviado!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar documento' });
  }
});

module.exports = router;
