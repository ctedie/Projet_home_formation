const favorisService = require('../services/favorisService');

// ============================================
// GET MES FAVORIS
// ============================================
exports.getMesFavoris = async (req, res) => {
  try {
    const favoris = await favorisService.getMesFavoris(req.user.id);
    res.json(favoris);
  } catch (err) {
    console.error('Erreur getMesFavoris :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// ADD FAVORI
// ============================================
exports.addFavori = async (req, res) => {
  try {
    const result = await favorisService.addFavori(req.user.id, req.params.id);
    res.status(201).json(result);
  } catch (err) {
    console.error('Erreur addFavori :', err);
    res.status(400).json({ error: err.message });
  }
};

// ============================================
// REMOVE FAVORI
// ============================================
exports.removeFavori = async (req, res) => {
  try {
    const result = await favorisService.removeFavori(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Erreur removeFavori :', err);
    res.status(400).json({ error: err.message });
  }
};

// ============================================
// IS FAVORI
// ============================================
exports.isFavori = async (req, res) => {
  try {
    const result = await favorisService.isFavori(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Erreur isFavori :', err);
    res.status(500).json({ error: err.message });
  }
};