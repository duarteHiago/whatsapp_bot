require('dotenv').config();
const { sendImage } = require('../methods/sendImage');

(async () => {
  try {
    const number = "5566984450238"; // Número com DDI
    const imageUrl = "https://s3.amazonaws.com/atendai/company-3708fcdf-954b-48f8-91ff-25babaccac67/1712605171932.jpeg"; // URL pública válida
    const caption = "🚀 Teste de envio de imagem pelo WhatsApp bot";

    const response = await sendImage(number, imageUrl, caption);
    console.log("✅ Imagem enviada com sucesso!");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Erro ao enviar imagem:");
    console.error(error.response?.data || error.message);
  }
})();
