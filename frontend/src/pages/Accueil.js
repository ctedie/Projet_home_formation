import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Accueil() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  return (
    <div className="container">
      <h1 className="page-title text-center">Bienvenue</h1>
      <p className="page-subtitle text-center">Application de gestion de recettes</p>
      <div className="row">
        <div className="col-md-4">
          <div
            className="card p-4 text-center"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/recettes')}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'}
          >
            <h3>🍽️ Recettes</h3>
            <p>Découvrez nos délicieuses recettes</p>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-4 text-center"
            style={{ cursor: 'pointer', opacity: user ? 1 : 0.6, pointerEvents: user ? 'auto' : 'none' }}
            onClick={() => navigate('/favoris')}
            onMouseEnter={(e) => {
              if (user) e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'}
            title={user ? 'Voir mes favoris' : 'Connectez-vous pour voir vos favoris'}
          >
            <h3>⭐ Favoris</h3>
            <p>Sauvegardez vos recettes préférées</p>
            {!user && <small className="text-muted">(Connectez-vous)</small>}
          </div>
        </div>
        <div className="col-md-4">
          {isAdmin && (
            <div
              className="card p-4 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/admin')}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'}
            >
              <h3>👨‍💼 Admin</h3>
              <p>Gérez les recettes et utilisateurs</p>
            </div>
          )}
          {!isAdmin && (
            <div className="card p-4 text-center" style={{ opacity: 0.5 }}>
              <h3>👨‍💼 Admin</h3>
              <p>Gérez les recettes et utilisateurs</p>
              <small className="text-muted">(Accès admin uniquement)</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accueil;