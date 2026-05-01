const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');
const { isAuthenticated } = require('../middlewares/auth');

// ============================================
// ROUTES PROTÉGÉES (authentification requise)
// ============================================

// GET mes favoris
router.get('/', isAuthenticated, favorisController.getMesFavoris);

// POST ajouter un favori
router.post('/:id', isAuthenticated, favorisController.addFavori);

// DELETE retirer un favori
router.delete('/:id', isAuthenticated, favorisController.removeFavori);

// GET vérifier si une recette est favorite
router.get('/:id', isAuthenticated, favorisController.isFavori);

module.exports = router;