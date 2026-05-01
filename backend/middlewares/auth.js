const jwt = require('jsonwebtoken');

// ============================================
// MIDDLEWARE : Vérifier que l'utilisateur est authentifié
// ============================================
exports.isAuthenticated = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Non authentifié - Token manquant',
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur token :', err.message);
    res.status(401).json({
      error: 'Token invalide ou expiré',
    });
  }
};

// ============================================
// MIDDLEWARE : Vérifier que l'utilisateur est admin
// ============================================
exports.isAdmin = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Non authentifié - Token manquant',
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier le rôle
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        error: 'Accès refusé - Admin requis',
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur token :', err.message);
    res.status(401).json({
      error: 'Token invalide ou expiré',
    });
  }
};