// controllers/messageController.js
const { sendMessage, sendImage, sendDocument, sendAudio, sendList } = require('../methods');

// Função genérica para lidar com envio
const handleSend = (sendFunction) => async (req, res) => {
  const { number, text, imageUrl, caption, documentUrl, audioUrl, filename } = req.body;

  // Validação básica
  if (!number) {
    return res.status(400).json({ success: false, error: 'Número é obrigatório.' });
  }

  try {
    // Chama o método correto com os parâmetros certos
    switch (sendFunction) {
      case 'text':
        if (!text) return res.status(400).json({ success: false, error: 'Texto é obrigatório.' });
        await sendMessage.sendText(number, text);
        break;
      case 'image':
        if (!imageUrl) return res.status(400).json({ success: false, error: 'URL da imagem é obrigatória.' });
        await sendImage.sendImage(number, imageUrl, caption);
        break;
      case 'document':
        if (!documentUrl || !filename) return res.status(400).json({ success: false, error: 'Documento e nome do arquivo são obrigatórios.' });
        await sendDocument.sendDocument(number, documentUrl, filename);
        break;
      case 'audio':
        if (!audioUrl) return res.status(400).json({ success: false, error: 'URL do áudio é obrigatória.' });
        await sendAudio.sendAudio(number, audioUrl);
        break;
      case 'list':
        if (!listMessage) return res.status(400).json({ success: false, error: 'Mensagem de lista é obrigatória.' });
        await sendList.sendList(number, listMessage);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Tipo de envio inválido.' });
    }

    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Erro ao enviar mensagem.' });
  }
};

// Exporta handlers específicos usando a função genérica
exports.handleSendText = handleSend('text');
exports.handleSendImage = handleSend('image');
exports.handleSendDocument = handleSend('document');
exports.handleSendAudio = handleSend('audio');
exports.handleSendList = handleSend('list');
