const express = require('express');
const router = express.Router();
const recettesController = require('../controllers/recettesController');
const { isAdmin } = require('../middlewares/auth');

// ============================================
// ROUTES PUBLIQUES
// ============================================
router.get('/', recettesController.getAll);
router.get('/:id', recettesController.getOne);

// ============================================
// ROUTES ADMIN
// ============================================
router.post('/', isAdmin, recettesController.create);
router.put('/:id', isAdmin, recettesController.update);
router.delete('/:id', isAdmin, recettesController.delete);

module.exports = router;