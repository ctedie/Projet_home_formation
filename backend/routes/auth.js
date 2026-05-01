const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// ============================================
// ROUTES PUBLIQUES
// ============================================
router.post('/login', authController.login);

// ============================================
// ROUTES PROTÉGÉES
// ============================================
router.get('/me', isAuthenticated, authController.getMe);

// ============================================
// ROUTES ADMIN
// ============================================
router.get('/utilisateurs', isAdmin, authController.getUtilisateurs);
router.put('/utilisateurs/:id', isAdmin, authController.updateUtilisateur);
router.delete('/utilisateurs/:id', isAdmin, authController.deleteUtilisateur);

module.exports = router;