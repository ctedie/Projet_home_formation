const fs = require('fs');
const path = require('path');

// ============================================
// SUPPRIMER UN FICHIER
// ============================================
exports.deleteFile = (filePath) => {
  if (!filePath) return;

  try {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error('Erreur suppression fichier :', err.message);
  }
};