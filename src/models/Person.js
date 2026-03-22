// src/models/Person.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tenant_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'Tenants', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  // O MÁGICO JSONB: Guarda dados flexíveis dependendo do business_type
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
    /* Exemplo Academia: { "weight": 80, "height": 1.80, "objective": "hypertrophy" }
       Exemplo Clínica:  { "blood_type": "O+", "allergies": ["penicillin"] }
       Exemplo Igreja:   { "baptism_date": "2025-10-11", "ministry": "worship" } */
  }
});

module.exports = Person;    