// src/routes/index.js
const { Router } = require('express');
const authRoutes = require('./auth.routes');
const personRoutes = require('./person.routes'); // Importe a nova rota

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/persons', personRoutes); // Registre aqui!

module.exports = routes;