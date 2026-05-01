const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ============================================
// CRÉER LE DOSSIER UPLOADS S'IL N'EXISTE PAS
// ============================================
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ============================================
// CONFIGURATION DU STOCKAGE
// ============================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom unique : timestamp + nombre aléatoire + extension
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

// ============================================
// VALIDATION DES FICHIERS
// ============================================
const fileFilter = (req, file, cb) => {
  // Formats acceptés
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format non supporté — utilisez JPG, PNG, WEBP ou GIF'), false);
  }
};

// ============================================
// CONFIGURATION MULTER
// ============================================
module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});