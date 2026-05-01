const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
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
router.post('/', isAdmin, upload.single('photo'), recettesController.create);
router.put('/:id', isAdmin, upload.single('photo'), recettesController.update);
router.delete('/:id', isAdmin, recettesController.delete);
router.delete('/:id/photo', isAdmin, recettesController.deletePhoto);

module.exports = router;