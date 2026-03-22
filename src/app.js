const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas da API
app.use('/api', routes);

// Middleware de tratamento de erros global (básico)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

module.exports = app;