import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
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

function Favoris() {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [filtre, setFiltre] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // VÉRIFIER SI CONNECTÉ
  // ============================================
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // ============================================
  // CHARGER LES FAVORIS
  // ============================================
  useEffect(() => {
    if (user) {
      loadFavoris();
    }
  }, [user]);

  const loadFavoris = async () => {
    try {
      setLoading(true);
      const data = await recettesService.getMesFavoris();
      setFavoris(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des favoris');
      console.error(err);
    } finally {
      setLoading(false);
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
  // RETIRER DES FAVORIS
  // ============================================
  const handleRemoveFavori = async (recetteId) => {
    try {
      await recettesService.removeFavori(recetteId);
      setFavoris(favoris.filter(r => r.id !== recetteId));
      closeModal();
    } catch (err) {
      setError('Erreur lors de la suppression du favori');
      console.error(err);
    }
  };

  // ============================================
  // FILTRER ET RECHERCHER
  // ============================================
  const filtrees = favoris.filter(r => {
    const matchFiltre = filtre === 'all' || r.categorie === filtre;
    const matchRecherche = r.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchFiltre && matchRecherche;
  });

  // ============================================
  // SI NON CONNECTÉ
  // ============================================
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="container my-4">
        <div className="text-center mb-4">
          <h1 className="page-title">⭐ Mes Favoris</h1>
          <p className="page-subtitle">Les recettes que vous avez sauvegardées</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* BARRE DE RECHERCHE */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher dans vos favoris..."
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

        {/* AFFICHAGE DES FAVORIS */}
        {loading ? (
          <p className="text-muted text-center">Chargement...</p>
        ) : favoris.length === 0 ? (
          <div className="alert alert-info text-center">
            <p>Vous n'avez pas encore ajouté de recettes à vos favoris.</p>
            <p>
              <a href="/recettes" className="alert-link">
                Découvrez nos recettes →
              </a>
            </p>
          </div>
        ) : filtrees.length === 0 ? (
          <p className="text-muted text-center">Aucun favori ne correspond à votre recherche.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {filtrees.map(r => (
              <div className="col" key={r.id}>
                <RecetteCard
                  recette={r}
                  onClick={openModal}
                  isFavori={true}
                  onToggleFavori={() => handleRemoveFavori(r.id)}
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
        onToggleFavori={handleRemoveFavori}
      />
    </>
  );
}

export default Favoris;