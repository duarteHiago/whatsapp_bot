const messageService = require('../services/messageService');

exports.handleListMessage = async (req, res) => {
  const { number, selection } = req.body;

  try {
    // Exemplo: envia mensagem de acordo com seleção do usuário
    await messageService.sendText(number, `Você selecionou: ${selection}`);
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
};
