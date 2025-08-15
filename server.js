const express = require('express');
const cors = require('cors');
require('dotenv').config();

const webhookRoutes = require('./src/routes/webhook.routes');
const logger = require('./src/utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/webhook', webhookRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'WhatsApp Menu Bot funcionando!', 
    status: 'online',
    timestamp: new Date().toISOString(),
    endpoints: {
      webhook: '/webhook',
      health: '/health'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 WhatsApp Menu Bot iniciado em http://localhost:${PORT}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});

module.exports = app;