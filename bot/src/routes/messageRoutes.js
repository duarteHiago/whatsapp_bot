// routes/messageRoutes.js
const express = require('express');
const router = express.Router();

// Imports dos métodos antigos
const { sendMessage, sendImage, sendAudio, sendDocument, sendList } = require('../methods');

// Import do controller específico para React
const frontendMessageController = require('../controllers/frontendMessageController');

// ====================
// Rotas antigas (compatibilidade)
// ====================

router.post('/send-text', async (req, res) => {
  try {
    const { number, text } = req.body;
    if (!number || !text)
      return res.status(400).json({ success: false, error: 'Número e texto obrigatórios.' });

    await sendMessage(number, text);
    res.json({ success: true, message: 'Texto enviado!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar texto' });
  }
});

router.post('/send-image', async (req, res) => {
  try {
    const { number, url, caption } = req.body;
    if (!number || !url)
      return res.status(400).json({ success: false, error: 'Número e URL da imagem obrigatórios.' });

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
    if (!number || !url)
      return res.status(400).json({ success: false, error: 'Número e URL do áudio obrigatórios.' });

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
    if (!number || !url || !filename)
      return res.status(400).json({ success: false, error: 'Número, URL e nome do arquivo obrigatórios.' });

    await sendDocument(number, url, filename);
    res.json({ success: true, message: 'Documento enviado!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar documento' });
  }
});

// ====================
// Rota unificada para React
// ====================

router.post('/message/send', frontendMessageController.sendMessage);

// ====================
// Exporta o router
// ====================

module.exports = router;
