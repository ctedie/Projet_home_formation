import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// ============================================
// PROVIDER
// ============================================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Charger le user depuis localStorage au montage
  useEffect(() => {
    if (token) {
      // Ajouter le token aux headers Axios par défaut
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Charger les infos utilisateur depuis localStorage
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
    setLoading(false);
  }, [token]);

  // ============================================
  // LOGIN
  // ============================================
  const login = async (nom, motDePasse) => {
    try {
      const res = await axios.post('/api/auth/login', { nom, motDePasse });
      const { token, user } = res.data;

      // Sauvegarder en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Ajouter le token aux headers Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Mettre à jour l'état
      setToken(token);
      setUser(user);

      return user;
    } catch (error) {
      throw error.response?.data?.error || 'Erreur de connexion';
    }
  };

  // ============================================
  // LOGOUT
  // ============================================
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  // ============================================
  // VÉRIFIER SI ADMIN
  // ============================================
  const isAdmin = user?.role === 'admin';

  // ============================================
  // RETURN
  // ============================================
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé avec AuthProvider');
  }
  return context;
};