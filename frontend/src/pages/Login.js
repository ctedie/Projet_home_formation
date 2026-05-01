import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [nom, setNom] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // SI DÉJÀ CONNECTÉ, REDIRIGER
  // ============================================
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // ============================================
  // SUBMIT FORMULAIRE
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!nom.trim()) {
      setError('Le nom est requis');
      return;
    }
    if (!motDePasse) {
      setError('Le mot de passe est requis');
      return;
    }

    try {
      setLoading(true);
      await login(nom, motDePasse);
      // Redirection automatique grâce au useEffect
    } catch (err) {
      setError(err);
      console.error('Erreur login :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-5">
            <h1 className="page-title text-center mb-4">Connexion</h1>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* NOM */}
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
              </div>

              {/* MOT DE PASSE */}
              <div className="mb-4">
                <label htmlFor="motDePasse" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="motDePasse"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* BOUTON CONNEXION */}
              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>

            {/* LIEN ACCUEIL */}
            <div className="text-center">
              <p className="text-muted mb-0">
                <a href="/" className="text-primary text-decoration-none">
                  ← Retour à l'accueil
                </a>
              </p>
            </div>
          </div>

          {/* ASTUCE POUR TESTER */}
          <div className="alert alert-info mt-4 small">
            <strong>Pour tester :</strong> Utilise les identifiants que tu as créés en base de données.
            <br />
            Par défaut : <code>nom: admin</code>, <code>motDePasse: admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;