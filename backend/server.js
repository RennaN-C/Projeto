require('dotenv').config();
const app = require('./app');

const { sequelize } = require('./models'); 

const PORT = process.env.PORT || 3000;


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexão estabelecida e tabelas sincronizadas com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar as tabelas com o banco:', error);
  });