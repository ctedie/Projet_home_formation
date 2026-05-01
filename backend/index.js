const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARES
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les uploads statiquement
app.use('/uploads', express.static('uploads'));

// ============================================
// ROUTES
// ============================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recettes', require('./routes/recettes'));
// À compléter dans les prochaines issues
// app.use('/api/favoris', require('./routes/favoris'));

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Serveur projet recette opérationnel',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion MySQL OK');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📡 Test : http://localhost:${PORT}/api/health`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur connexion BDD :', err.message);
    process.exit(1);
  });