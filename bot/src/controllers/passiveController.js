const passiveServices = require("../services/passiveService");
const welcomeTemplate = require("../utils/templates/welcomeTemplate");

// Set para controlar usuários que já receberam a lista
const usersSent = new Set();

async function handleIncoming(req, res) {
  try {
    const message = req.body;

    // Log para depuração
    console.log('Evento recebido:', message.event);
    
    // Identifica o remetente corretamente
    const from = message.data?.key?.remoteJid || message.data?.remoteJid;
    const isFromMe = message.data?.key?.fromMe || false;

    console.log('De:', from, 'fromMe?', isFromMe, 'usersSent?', usersSent.has(from));

    // Envia lista somente se for mensagem de outro usuário e ainda não foi enviada
    if (!isFromMe && from && !usersSent.has(from)) {
      await passiveServices.handleIncomingMessage(from, welcomeTemplate);
      console.log(`Lista enviada para ${from}`);
      usersSent.add(from);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('Erro no passiveController:', err);
    res.sendStatus(500);
  }
}

module.exports = { handleIncoming };
