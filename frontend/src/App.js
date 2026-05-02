import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Collapse } from 'bootstrap';
import { AuthProvider, useAuth } from './context/AuthContext';import Accueil from './pages/Accueil';
import Recettes from './pages/Recettes';
import Favoris from './pages/Favoris';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.scss';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => {
    const menuEl = document.getElementById('navMenu');
    if (!menuEl) return;
    const collapse = Collapse.getInstance(menuEl);
    if (collapse) collapse.hide();
  };

  // Fermer le menu au changement de route
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Fermer le menu au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      const navbar = document.querySelector('.navbar');
      if (navbar && !navbar.contains(e.target)) closeMenu();
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
          🍽️ Recettes
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeMenu}>
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recettes" onClick={closeMenu}>
                Recettes
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/favoris" onClick={closeMenu}>
                  ⭐ Favoris
                </NavLink>
              </li>
            )}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin" onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Déconnexion ({user.nom})
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                  Connexion
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;