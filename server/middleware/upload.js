const multer = require('multer');

// Use memory storage — buffer is passed directly to Cloudinary upload_stream
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Single artwork upload (15 MB limit)
const uploadArtwork = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
});

// Multiple reference images (10 MB per file, max 5 files)
const uploadReference = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { uploadArtwork, uploadReference };
