import React from 'react';

function Accueil() {
  return (
    <div className="container">
      <h1 className="page-title text-center">Bienvenue</h1>
      <p className="page-subtitle text-center">Application de gestion de recettes</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h3>🍽️ Recettes</h3>
            <p>Découvrez nos délicieuses recettes</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h3>⭐ Favoris</h3>
            <p>Sauvegardez vos recettes préférées</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h3>👨‍💼 Admin</h3>
            <p>Gérez les recettes et utilisateurs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;