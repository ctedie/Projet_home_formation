import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import RecetteCard from '../components/RecetteCard';
import RecetteModal from '../components/RecetteModal';
import * as recettesService from '../services/recettesService';
import { useAuth } from '../context/AuthContext';

const CATEGORIE_LABELS = {
  entree: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
  boisson: 'Boisson',
};

function Recettes() {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [filtre, setFiltre] = useState('all');
  const [favorisIds, setFavorisIds] = useState(new Set());
  const { user } = useAuth();

  // ============================================
  // CHARGER LES RECETTES
  // ============================================
  useEffect(() => {
    loadRecettes();
  }, []);

  const loadRecettes = async () => {
    try {
      setLoading(true);
      const data = await recettesService.getAllRecettes();
      setRecettes(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des recettes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CHARGER LES FAVORIS DE L'UTILISATEUR
  // ============================================
  useEffect(() => {
    if (user) {
      loadFavoris();
    } else {
      setFavorisIds(new Set());
    }
  }, [user]);

  const loadFavoris = async () => {
    try {
      const favoris = await recettesService.getMesFavoris();
      setFavorisIds(new Set(favoris.map(f => f.id)));
    } catch (err) {
      console.error('Erreur chargement favoris :', err);
    }
  };

  // ============================================
  // OUVRIR MODALE
  // ============================================
  const openModal = (recette) => {
    setSelected(recette);
    setTimeout(() => {
      const el = document.getElementById('recetteModal');
      const modal = new Modal(el);
      modal.show();
    }, 50);
  };

  // ============================================
  // FERMER MODALE
  // ============================================
  const closeModal = () => {
    const el = document.getElementById('recetteModal');
    const modal = Modal.getInstance(el);
    if (modal) modal.hide();
    setSelected(null);
  };

  // ============================================
  // TOGGLE FAVORI
  // ============================================
  const handleToggleFavori = async (recetteId) => {
    try {
      if (favorisIds.has(recetteId)) {
        await recettesService.removeFavori(recetteId);
        setFavorisIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(recetteId);
          return newSet;
        });
      } else {
        await recettesService.addFavori(recetteId);
        setFavorisIds(prev => new Set(prev).add(recetteId));
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour des favoris');
      console.error(err);
    }
  };

  // ============================================
  // FILTRER ET RECHERCHER
  // ============================================
  const filtrees = recettes.filter(r => {
    const matchFiltre = filtre === 'all' || r.categorie === filtre;
    const matchRecherche = r.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchFiltre && matchRecherche;
  });

  return (
    <>
      <div className="container my-4">
        <div className="text-center mb-4">
          <h1 className="page-title">Recettes de famille</h1>
          <p className="page-subtitle">Les trésors culinaires transmis de génération en génération</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* BARRE DE RECHERCHE */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher une recette..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        {/* FILTRES */}
        <div className="d-flex gap-2 flex-wrap mb-4">
          {['all', 'entree', 'plat', 'dessert', 'boisson'].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${filtre === cat ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFiltre(cat)}
            >
              {cat === 'all' ? 'Toutes' : CATEGORIE_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* AFFICHAGE DES RECETTES */}
        {loading ? (
          <p className="text-muted text-center">Chargement...</p>
        ) : filtrees.length === 0 ? (
          <p className="text-muted text-center">Aucune recette ne correspond à votre recherche.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {filtrees.map(r => (
              <div className="col" key={r.id}>
                <RecetteCard
                  recette={r}
                  onClick={openModal}
                  isFavori={favorisIds.has(r.id)}
                  onToggleFavori={user ? handleToggleFavori : null}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALE */}
      <RecetteModal
        selected={selected}
        onClose={closeModal}
        onToggleFavori={handleToggleFavori}
      />
    </>
  );
}

export default Recettes;