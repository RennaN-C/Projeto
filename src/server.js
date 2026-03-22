require('dotenv').config();
const app = require('./app');

// IMPORTANTE: Importe o sequelize de dentro da pasta models!
// Assim ele carrega o Tenant, User e Person e entende as relações antes de criar as tabelas.
const { sequelize } = require('./models'); 

const PORT = process.env.PORT || 3000;

// O comando .sync({ alter: true }) é o que cria as tabelas no pgAdmin
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