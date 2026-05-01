const recettesService = require('../services/recettesService');

// ============================================
// GET ALL RECETTES
// ============================================
exports.getAll = async (req, res) => {
  try {
    const recettes = await recettesService.getAllRecettes();
    res.json(recettes);
  } catch (err) {
    console.error('Erreur getAll :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GET ONE RECETTE
// ============================================
exports.getOne = async (req, res) => {
  try {
    const recette = await recettesService.getRecetteById(req.params.id);
    res.json(recette);
  } catch (err) {
    console.error('Erreur getOne :', err);
    res.status(404).json({ error: err.message });
  }
};

// ============================================
// CREATE RECETTE
// ============================================
exports.create = async (req, res) => {
  try {
    const recette = await recettesService.createRecette(req.body);
    res.status(201).json(recette);
  } catch (err) {
    console.error('Erreur create :', err);
    res.status(400).json({ error: err.message });
  }
};

// ============================================
// UPDATE RECETTE
// ============================================
exports.update = async (req, res) => {
  try {
    const recette = await recettesService.updateRecette(req.params.id, req.body);
    res.json(recette);
  } catch (err) {
    console.error('Erreur update :', err);
    res.status(400).json({ error: err.message });
  }
};

// ============================================
// DELETE RECETTE
// ============================================
exports.delete = async (req, res) => {
  try {
    const result = await recettesService.deleteRecette(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Erreur delete :', err);
    res.status(404).json({ error: err.message });
  }
};