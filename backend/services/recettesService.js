const { Recette } = require('../models');

// ============================================
// GET ALL RECETTES
// ============================================
exports.getAllRecettes = async () => {
  try {
    const recettes = await Recette.findAll({
      order: [['createdAt', 'DESC']],
    });
    return recettes;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des recettes : ${err.message}`);
  }
};

// ============================================
// GET ONE RECETTE BY ID
// ============================================
exports.getRecetteById = async (id) => {
  try {
    const recette = await Recette.findByPk(id);
    if (!recette) {
      throw new Error('Recette introuvable');
    }
    return recette;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// CREATE RECETTE
// ============================================
exports.createRecette = async (data) => {
  try {
    // Validation
    if (!data.nom || data.nom.trim() === '') {
      throw new Error('Le nom de la recette est requis');
    }

    const recette = await Recette.create({
      nom: data.nom,
      description: data.description,
      ingredients: data.ingredients,
      etapes: data.etapes,
      auteur: data.auteur,
      categorie: data.categorie || 'plat',
      temps: data.temps,
      portions: data.portions ? parseInt(data.portions) : null,
    });

    return recette;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// UPDATE RECETTE
// ============================================
exports.updateRecette = async (id, data) => {
  try {
    const recette = await Recette.findByPk(id);
    if (!recette) {
      throw new Error('Recette introuvable');
    }

    // Validation
    if (data.nom && data.nom.trim() === '') {
      throw new Error('Le nom de la recette ne peut pas être vide');
    }

    await recette.update({
      nom: data.nom,
      description: data.description,
      ingredients: data.ingredients,
      etapes: data.etapes,
      auteur: data.auteur,
      categorie: data.categorie,
      temps: data.temps,
      portions: data.portions ? parseInt(data.portions) : null,
    });

    return recette;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// DELETE RECETTE
// ============================================
exports.deleteRecette = async (id) => {
  try {
    const recette = await Recette.findByPk(id);
    if (!recette) {
      throw new Error('Recette introuvable');
    }

    await recette.destroy();
    return { message: 'Recette supprimée avec succès' };
  } catch (err) {
    throw new Error(err.message);
  }
};