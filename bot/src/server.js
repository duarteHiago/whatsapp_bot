const express = require('express');
const cors = require('cors');
const app = express();
const messageRoutes = require('./routes/messageRoutes'); // caminho correto

app.use(cors());
app.use(express.json());
app.use('/api', messageRoutes); // todas as rotas ficam sob /api

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
