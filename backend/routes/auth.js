const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');

// ============================================
// ROUTES PUBLIQUES
// ============================================
router.post('/login', authController.login);

// ============================================
// ROUTES PROTÉGÉES
// ============================================
router.get('/me', isAuthenticated, authController.getMe);

module.exports = router;