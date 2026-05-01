import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// ============================================
// INTERCEPTEUR : Ajouter le token aux requêtes
// ============================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================
// AUTH
// ============================================
export const login = (nom, motDePasse) =>
  api.post('/auth/login', { nom, motDePasse });

export const getMe = () => api.get('/auth/me');

// ============================================
// RECETTES
// ============================================
export const getRecettes = () => api.get('/recettes');
export const getRecette = (id) => api.get(`/recettes/${id}`);
export const createRecette = (data) =>
  api.post('/recettes', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateRecette = (id, data) =>
  api.put(`/recettes/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteRecette = (id) => api.delete(`/recettes/${id}`);
export const deletePhotoRecette = (id) => api.delete(`/recettes/${id}/photo`);

// ============================================
// FAVORIS
// ============================================
export const getMesFavoris = () => api.get('/favoris');
export const addFavori = (recetteId) => api.post(`/favoris/${recetteId}`);
export const removeFavori = (recetteId) => api.delete(`/favoris/${recetteId}`);
export const isFavori = (recetteId) => api.get(`/favoris/${recetteId}`);

export default api;