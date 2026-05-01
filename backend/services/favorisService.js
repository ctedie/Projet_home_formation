const { Favori, Recette } = require('../models');

// ============================================
// GET ALL FAVORIS DE L'UTILISATEUR
// ============================================
exports.getMesFavoris = async (utilisateurId) => {
  try {
    const favoris = await Favori.findAll({
      where: { UtilisateurId: utilisateurId },
      include: [
        {
          model: Recette,
          attributes: ['id', 'nom', 'description', 'categorie', 'temps', 'portions', 'photo'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Retourner un tableau de recettes
    return favoris.map(f => f.Recette);
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des favoris : ${err.message}`);
  }
};

// ============================================
// AJOUTER UN FAVORI
// ============================================
exports.addFavori = async (utilisateurId, recetteId) => {
  try {
    // Vérifier que la recette existe
    const recette = await Recette.findByPk(recetteId);
    if (!recette) {
      throw new Error('Recette introuvable');
    }

    // Vérifier que le favori n'existe pas déjà
    const existing = await Favori.findOne({
      where: { UtilisateurId: utilisateurId, RecetteId: recetteId },
    });

    if (existing) {
      throw new Error('Cette recette est déjà dans vos favoris');
    }

    // Créer le favori
    const favori = await Favori.create({
      UtilisateurId: utilisateurId,
      RecetteId: recetteId,
    });

    return { message: 'Recette ajoutée aux favoris', favori };
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// RETIRER UN FAVORI
// ============================================
exports.removeFavori = async (utilisateurId, recetteId) => {
  try {
    const favori = await Favori.findOne({
      where: { UtilisateurId: utilisateurId, RecetteId: recetteId },
    });

    if (!favori) {
      throw new Error('Cette recette n\'est pas dans vos favoris');
    }

    await favori.destroy();
    return { message: 'Recette retirée des favoris' };
  } catch (err) {
    throw new Error(err.message);
  }
};

// ============================================
// VÉRIFIER SI UNE RECETTE EST FAVORITE
// ============================================
exports.isFavori = async (utilisateurId, recetteId) => {
  try {
    const favori = await Favori.findOne({
      where: { UtilisateurId: utilisateurId, RecetteId: recetteId },
    });

    return {
      isFavori: !!favori,
      recetteId: recetteId,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};