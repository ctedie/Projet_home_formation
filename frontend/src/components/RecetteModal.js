import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import * as recettesService from '../services/recettesService';
import { useAuth } from '../context/AuthContext';

const CATEGORIE_LABELS = {
  entree: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
  boisson: 'Boisson',
};

const emojis = { entree: '🥗', plat: '🍲', dessert: '🍰', boisson: '🥤' };

function RecetteModal({ selected, onClose, onToggleFavori }) {
  const [isFavori, setIsFavori] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (selected && user) {
      checkFavori();
    }
  }, [selected, user]);

  const checkFavori = async () => {
    try {
      const result = await recettesService.checkIfFavori(selected.id);
      setIsFavori(result.isFavori);
    } catch (err) {
      console.error('Erreur vérification favori :', err);
    }
  };

  const handleToggleFavori = async () => {
    try {
      if (isFavori) {
        await recettesService.removeFavori(selected.id);
      } else {
        await recettesService.addFavori(selected.id);
      }
      setIsFavori(!isFavori);
      onToggleFavori && onToggleFavori(selected.id);
    } catch (err) {
      console.error('Erreur toggling favori :', err);
    }
  };

  if (!selected) return null;

  return (
    <div className="modal fade" id="recetteModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header recipe-modal__header">
            <h5 className="modal-title">{selected.nom}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose} />
          </div>
          <div className="modal-body p-0">
            <div className="recipe-modal__img">
              {selected.photo ? (
                <img src={selected.photo} alt={selected.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span>{emojis[selected.categorie] || '🍽'}</span>
              )}
            </div>
            <div className="p-4">
              <span className={`recipe-modal__badge recipe-modal__badge--${selected.categorie}`}>
                {CATEGORIE_LABELS[selected.categorie]}
              </span>
              <p className="text-muted mt-2">{selected.description}</p>
              <div className="d-flex gap-3 my-3 flex-wrap">
                {selected.temps && <span className="badge bg-secondary">⏱ {selected.temps}</span>}
                {selected.portions && <span className="badge bg-secondary">👥 {selected.portions} pers.</span>}
                {selected.auteur && <span className="badge bg-secondary">👨‍🍳 {selected.auteur}</span>}
              </div>

              {user && (
                <div className="mb-3">
                  <button
                    className={`favorite-btn ${isFavori ? 'active' : ''}`}
                    onClick={handleToggleFavori}
                    title={isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    {isFavori ? '⭐ Retirer des favoris' : '☆ Ajouter aux favoris'}
                  </button>
                </div>
              )}

              <h6 className="recipe-modal__section-title">Ingrédients</h6>
              <p style={{ whiteSpace: 'pre-line' }}>{selected.ingredients}</p>

              <h6 className="recipe-modal__section-title">Préparation</h6>
              <p style={{ whiteSpace: 'pre-line' }}>{selected.etapes}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecetteModal;