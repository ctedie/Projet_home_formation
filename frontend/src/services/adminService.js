import * as api from '../api';

// ============================================
// UTILISATEURS
// ============================================

export const getUtilisateurs = async () => {
  try {
    const response = await api.default.get('/auth/utilisateurs');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors du chargement des utilisateurs';
  }
};

export const updateUtilisateur = async (id, role) => {
  try {
    const response = await api.default.put(`/auth/utilisateurs/${id}`, { role });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la modification';
  }
};

export const deleteUtilisateur = async (id) => {
  try {
    const response = await api.default.delete(`/auth/utilisateurs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la suppression';
  }
};

// ============================================
// RECETTES (réutiliser le service existant)
// ============================================

export const getAllRecettes = async () => {
  try {
    const response = await api.getRecettes();
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors du chargement des recettes';
  }
};

export const createRecette = async (data) => {
  try {
    const response = await api.createRecette(data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la création';
  }
};

export const updateRecette = async (id, data) => {
  try {
    const response = await api.updateRecette(id, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la modification';
  }
};

export const deleteRecette = async (id) => {
  try {
    const response = await api.deleteRecette(id);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la suppression';
  }
};

export const deletePhotoRecette = async (id) => {
  try {
    const response = await api.deletePhotoRecette(id);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Erreur lors de la suppression de la photo';
  }
};