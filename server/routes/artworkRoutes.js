const express = require('express');
const router = express.Router();
const {
  getArtworks,
  getArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
} = require('../controllers/artworkController');
const { protect } = require('../middleware/authMiddleware');
const { uploadArtwork } = require('../middleware/upload');

router.get('/', getArtworks);
router.get('/:id', getArtwork);
router.post('/', protect, uploadArtwork.single('image'), createArtwork);
router.patch('/:id', protect, updateArtwork);
router.delete('/:id', protect, deleteArtwork);

module.exports = router;
