const express = require('express');
const webhookRoutes = require('./routes/webhook');
const logger = require('./utils/logger');

const app = express();
const messageRoutes = require('./routes/messageRoutes')

app.use(express.json());
app.use(logger); // middleware de logs

app.use('/webhook', webhookRoutes);
app.use('/messages', messageRoutes);

module.exports = app;
