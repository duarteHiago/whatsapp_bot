const express = require('express');
const webhookRoutes = require('./routes/webhook');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(logger); // middleware de logs

app.use('/webhook', webhookRoutes);

module.exports = app;
