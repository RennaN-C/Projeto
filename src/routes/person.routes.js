const { Router } = require('express');
const PersonController = require('../controllers/PersonController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

// Todas as rotas abaixo exigem Token JWT válido
router.use(authMiddleware);

// Rotas de CRUD
router.post('/', PersonController.store);          // POST /api/persons (Criar)
router.get('/', PersonController.index);           // GET  /api/persons (Listar todos)
router.get('/:id', PersonController.show);         // GET  /api/persons/:id (Ver um)
router.put('/:id', PersonController.update);       // PUT  /api/persons/:id (Editar)
router.delete('/:id', PersonController.delete);    // DEL  /api/persons/:id (Deletar)

module.exports = router;