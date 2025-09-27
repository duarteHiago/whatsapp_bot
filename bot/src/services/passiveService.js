const { sendList } = require('../methods/sendList');
const templates = require('../utils/templates/passiveMessages');

async function handleIncomingMessage(number, text) {
    try {
        const listTemplate = templates.welcomeList;

        // envia a lista via Evolution API
        await sendList(number, listTemplate);

        console.log(`Lista enviada para ${number}`);
    } catch (error) {
        console.error('Erro ao enviar lista passiva:', error.response?.data || error.message);
    }
}

module.exports = { handleIncomingMessage };
