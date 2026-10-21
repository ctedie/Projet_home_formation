const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');

// ============================================
// LOGIN
// ============================================
exports.login = async (req, res) => {
  try {
    const { nom, motDePasse } = req.body;

    // Validation des données
    if (!nom || !motDePasse) {
      return res.status(400).json({
        error: 'Nom et mot de passe requis',
      });
    }

    // Chercher l'utilisateur
    const user = await Utilisateur.findOne({ where: { nom } });
    if (!user) {
      return res.status(401).json({
        error: 'Identifiants incorrects',
      });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!validPassword) {
      return res.status(401).json({
        error: 'Identifiants incorrects',
      });
    }

    // Générer le JWT
    const token = jwt.sign(
      { id: user.id, nom: user.nom, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retourner le token et les infos utilisateur
    res.json({
      token,
      user: {
        id: user.id,
        nom: user.nom,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Erreur login :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GET CURRENT USER
// ============================================
exports.getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error('Erreur getMe :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GET ALL UTILISATEURS
// ============================================
exports.getUtilisateurs = async (req, res) => {
  try {
    const users = await Utilisateur.findAll({
      attributes: ['id', 'nom', 'role'],
    });
    res.json(users);
  } catch (err) {
    console.error('Erreur getUtilisateurs :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// UPDATE UTILISATEUR ROLE
// ============================================
exports.updateUtilisateur = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['admin', 'membre'].includes(role)) {
      return res.status(400).json({ error: 'Rôle invalide' });
    }

    const user = await Utilisateur.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    await user.update({ role });
    res.json({ id: user.id, nom: user.nom, role: user.role });
  } catch (err) {
    console.error('Erreur updateUtilisateur :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// DELETE UTILISATEUR
// ============================================
exports.deleteUtilisateur = async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // Impossible de se supprimer soi-même
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'Impossible de se supprimer soi-même' });
    }

    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error('Erreur deleteUtilisateur :', err);
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// CREATE UTILISATEUR (ADMIN ONLY) 
// ============================================ 
exports.creerUtilisateur = async (req, res) => { 
  try { 
    const { nom, motDePasse, role } = req.body;
    if (!nom || !motDePasse) { 
      return res.status(400).json({ error: 'Le nom et le mot de passe sont requis' }); 
    } 
    // Vérifier si le nom existe déjà 
    const userExists = await Utilisateur.findOne({ where: { nom } }); 
    if (userExists) { 
      return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' }); 
    } 
    // Hacher le mot de passe 
    const hashedPassword = await bcrypt.hash(motDePasse, 10); 
    const userRole = role === 'admin' ? 'admin' : 'membre'; 
    // Créer l'utilisateur 
    const newUser = await Utilisateur.create({ 
      nom, 
      motDePasse: hashedPassword, 
      role: userRole, 
    }); 
    
    res.status(201).json({ 
      id: newUser.id, 
      nom: newUser.nom, 
      role: newUser.role, 
    }); 
  } catch (err) { 
    console.error('Erreur creerUtilisateur :', err); 
    res.status(500).json({ error: err.message }); 
  } 
};