import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as adminService from '../services/adminService';

const CATEGORIE_LABELS = {
  entree: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
  boisson: 'Boisson',
};

const ROLE_LABELS = {
  admin: 'Administrateur',
  membre: 'Membre',
};

function Admin() {
  const [activeTab, setActiveTab] = useState('recettes');
  const [recettes, setRecettes] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // States formulaire recette
  const [showFormRecette, setShowFormRecette] = useState(false);
  const [editingRecette, setEditingRecette] = useState(null);
  const [formRecette, setFormRecette] = useState({
    nom: '',
    description: '',
    ingredients: '',
    etapes: '',
    auteur: '',
    categorie: 'plat',
    temps: '',
    portions: '',
  });
  const [photoFile, setPhotoFile] = useState(null);

  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // PROTECTION ADMIN
  // ============================================
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // ============================================
  // CHARGER DONNÉES
  // ============================================
  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'recettes') {
        loadRecettes();
      } else {
        loadUtilisateurs();
      }
    }
  }, [activeTab, isAdmin]);

  const loadRecettes = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllRecettes();
      setRecettes(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadUtilisateurs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUtilisateurs();
      setUtilisateurs(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RECETTES - FORMULAIRE
  // ============================================
  const handleCreateRecette = async (e) => {
    e.preventDefault();
    if (!formRecette.nom.trim()) {
      setError('Le nom de la recette est requis');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(formRecette).forEach(([key, val]) => {
        formData.append(key, val);
      });
      if (photoFile) formData.append('photo', photoFile);

      const result = await adminService.createRecette(formData);
      setRecettes([result, ...recettes]);
      resetFormRecette();
      setSuccess('Recette créée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecette = async (e) => {
    e.preventDefault();
    if (!formRecette.nom.trim()) {
      setError('Le nom de la recette est requis');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(formRecette).forEach(([key, val]) => {
        formData.append(key, val);
      });
      if (photoFile) formData.append('photo', photoFile);

      const result = await adminService.updateRecette(editingRecette.id, formData);
      setRecettes(recettes.map(r => r.id === result.id ? result : r));
      resetFormRecette();
      setSuccess('Recette modifiée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecette = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) return;

    try {
      setLoading(true);
      await adminService.deleteRecette(id);
      setRecettes(recettes.filter(r => r.id !== id));
      setSuccess('Recette supprimée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFormRecette = () => {
    setFormRecette({
      nom: '',
      description: '',
      ingredients: '',
      etapes: '',
      auteur: '',
      categorie: 'plat',
      temps: '',
      portions: '',
    });
    setPhotoFile(null);
    setEditingRecette(null);
    setShowFormRecette(false);
  };

  const handleEditRecette = (recette) => {
    setFormRecette({
      nom: recette.nom,
      description: recette.description,
      ingredients: recette.ingredients,
      etapes: recette.etapes,
      auteur: recette.auteur,
      categorie: recette.categorie,
      temps: recette.temps,
      portions: recette.portions || '',
    });
    setEditingRecette(recette);
    setShowFormRecette(true);
  };

  // ============================================
  // UTILISATEURS
  // ============================================
  const handleUpdateRole = async (id, newRole) => {
    try {
      setLoading(true);
      const result = await adminService.updateUtilisateur(id, newRole);
      setUtilisateurs(utilisateurs.map(u => u.id === id ? result : u));
      setSuccess('Rôle modifié avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUtilisateur = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      setLoading(true);
      await adminService.deleteUtilisateur(id);
      setUtilisateurs(utilisateurs.filter(u => u.id !== id));
      setSuccess('Utilisateur supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container my-4">
      <h1 className="page-title text-center mb-4">👨‍💼 Admin Panel</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* ONGLETS */}
      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'recettes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recettes')}
            type="button"
          >
            🍽️ Recettes
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'utilisateurs' ? 'active' : ''}`}
            onClick={() => setActiveTab('utilisateurs')}
            type="button"
          >
            👥 Utilisateurs
          </button>
        </li>
      </ul>

      {/* TAB RECETTES */}
      {activeTab === 'recettes' && (
        <div>
          <button
            className="btn btn-primary mb-4"
            onClick={() => {
              resetFormRecette();
              setShowFormRecette(true);
            }}
          >
            + Ajouter une recette
          </button>

          {showFormRecette && (
            <div className="card p-4 mb-4">
              <h5>{editingRecette ? 'Modifier la recette' : 'Nouvelle recette'}</h5>
              <form
                onSubmit={editingRecette ? handleUpdateRecette : handleCreateRecette}
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom"
                      value={formRecette.nom}
                      onChange={(e) => setFormRecette({ ...formRecette, nom: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Auteur"
                      value={formRecette.auteur}
                      onChange={(e) => setFormRecette({ ...formRecette, auteur: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={formRecette.categorie}
                      onChange={(e) => setFormRecette({ ...formRecette, categorie: e.target.value })}
                      disabled={loading}
                    >
                      {Object.entries(CATEGORIE_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Temps"
                      value={formRecette.temps}
                      onChange={(e) => setFormRecette({ ...formRecette, temps: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Portions"
                      value={formRecette.portions}
                      onChange={(e) => setFormRecette({ ...formRecette, portions: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Description"
                      value={formRecette.description}
                      onChange={(e) => setFormRecette({ ...formRecette, description: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Ingrédients"
                      value={formRecette.ingredients}
                      onChange={(e) => setFormRecette({ ...formRecette, ingredients: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Étapes"
                      value={formRecette.etapes}
                      onChange={(e) => setFormRecette({ ...formRecette, etapes: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files[0])}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetFormRecette}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading && activeTab === 'recettes' && !showFormRecette ? (
            <p className="text-muted">Chargement...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Auteur</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recettes.map(recette => (
                    <tr key={recette.id}>
                      <td>{recette.nom}</td>
                      <td>
                        <span className={`badge bg-primary`}>
                          {CATEGORIE_LABELS[recette.categorie]}
                        </span>
                      </td>
                      <td>{recette.auteur || '-'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditRecette(recette)}
                          disabled={loading}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteRecette(recette.id)}
                          disabled={loading}
                        >
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB UTILISATEURS */}
      {activeTab === 'utilisateurs' && (
        <div>
          {loading && activeTab === 'utilisateurs' ? (
            <p className="text-muted">Chargement...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map(utilisateur => (
                    <tr key={utilisateur.id}>
                      <td>{utilisateur.nom}</td>
                      <td>
                        <span
                          className={`badge ${
                            utilisateur.role === 'admin' ? 'bg-danger' : 'bg-secondary'
                          }`}
                        >
                          {ROLE_LABELS[utilisateur.role]}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm d-inline w-auto me-2"
                          value={utilisateur.role}
                          onChange={(e) => handleUpdateRole(utilisateur.id, e.target.value)}
                          disabled={loading || utilisateur.id === user.id}
                        >
                          <option value="membre">Membre</option>
                          <option value="admin">Administrateur</option>
                        </select>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUtilisateur(utilisateur.id)}
                          disabled={loading || utilisateur.id === user.id}
                          title={utilisateur.id === user.id ? 'Impossible de se supprimer soi-même' : ''}
                        >
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;