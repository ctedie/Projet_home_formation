const { Recette } = require('../models');
const { deleteFile } = require('../utils/fileUtils');

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
exports.createRecette = async (data, file) => {
  try {
    // Validation
    if (!data.nom || data.nom.trim() === '') {
      // Supprimer l'image si elle a été uploadée
      if (file) {
        deleteFile(`/uploads/${file.filename}`);
      }
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
      photo: file ? `/uploads/${file.filename}` : null,
    });

    return recette;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// UPDATE RECETTE
// ============================================
exports.updateRecette = async (id, data, file) => {
  try {
    const recette = await Recette.findByPk(id);
    if (!recette) {
      // Supprimer l'image si elle a été uploadée
      if (file) {
        deleteFile(`/uploads/${file.filename}`);
      }
      throw new Error('Recette introuvable');
    }

    // Validation
    if (data.nom && data.nom.trim() === '') {
      if (file) {
        deleteFile(`/uploads/${file.filename}`);
      }
      throw new Error('Le nom de la recette ne peut pas être vide');
    }

    // Si une nouvelle image est fournie, supprimer l'ancienne
    if (file && recette.photo) {
      deleteFile(recette.photo);
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
      photo: file ? `/uploads/${file.filename}` : recette.photo,
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

    // Supprimer la photo si elle existe
    if (recette.photo) {
      deleteFile(recette.photo);
    }

    await recette.destroy();
    return { message: 'Recette supprimée avec succès' };
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// DELETE PHOTO RECETTE
// ============================================
exports.deletePhotoRecette = async (id) => {
  try {
    const recette = await Recette.findByPk(id);
    if (!recette) {
      throw new Error('Recette introuvable');
    }

    // Supprimer la photo si elle existe
    if (recette.photo) {
      deleteFile(recette.photo);
    }

    // Mettre à jour la recette (photo = null)
    await recette.update({ photo: null });

    return recette;
  } catch (err) {
    throw new Error(err.message);
  }
};