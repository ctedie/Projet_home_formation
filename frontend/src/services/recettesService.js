import * as api from '../api';

// ============================================
// GET ALL RECETTES
// ============================================
export const getAllRecettes = async () => {
  try {
    const response = await api.getRecettes();
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors du chargement des recettes';
  }
};

// ============================================
// GET ONE RECETTE
// ============================================
export const getRecetteById = async (id) => {
  try {
    const response = await api.getRecette(id);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Recette introuvable';
  }
};

// ============================================
// GET MES FAVORIS
// ============================================
export const getMesFavoris = async () => {
  try {
    const response = await api.getMesFavoris();
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors du chargement des favoris';
  }
};

// ============================================
// ADD FAVORI
// ============================================
export const addFavori = async (recetteId) => {
  try {
    const response = await api.addFavori(recetteId);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de l\'ajout aux favoris';
  }
};

// ============================================
// REMOVE FAVORI
// ============================================
export const removeFavori = async (recetteId) => {
  try {
    const response = await api.removeFavori(recetteId);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la suppression du favori';
  }
};

// ============================================
// CHECK IF FAVORI
// ============================================
export const checkIfFavori = async (recetteId) => {
  try {
    const response = await api.isFavori(recetteId);
    return response.data;
  } catch (error) {
    return { isFavori: false };
  }
};