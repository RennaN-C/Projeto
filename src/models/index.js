// 1. Importe a conexão com o banco (database.js) aqui no topo
const sequelize = require('../config/database'); 

const Tenant = require('./Tenant');
const User = require('./User');
const Person = require('./Person');

// Um Tenant tem muitos Usuários e muitas Pessoas
Tenant.hasMany(User, { foreignKey: 'tenant_id' });
User.belongsTo(Tenant, { foreignKey: 'tenant_id' });

Tenant.hasMany(Person, { foreignKey: 'tenant_id' });
Person.belongsTo(Tenant, { foreignKey: 'tenant_id' });

// 2. Adicione o 'sequelize' aqui no module.exports para o server.js conseguir enxergar ele!
module.exports = { sequelize, Tenant, User, Person };