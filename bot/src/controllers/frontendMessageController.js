const { sendMessage } = require('../methods');

exports.sendMessage = async (req, res) => {
  const { number, text } = req.body;
  if (!number || !text)
    return res.status(400).json({ success: false, error: 'Número e texto obrigatórios.' });

  try {
    await sendMessage(number, text);
    res.json({ success: true, message: 'Mensagem enviada!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao enviar mensagem.' });
  }
};

