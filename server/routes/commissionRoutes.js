const express = require('express');
const router = express.Router();
const {
  createCommission,
  getCommissions,
  updateCommissionStatus,
  getCommission,
} = require('../controllers/commissionController');
const { protect } = require('../middleware/authMiddleware');
const { uploadReference } = require('../middleware/upload');

// Public — submit new commission
router.post('/', uploadReference.array('referenceImages', 5), createCommission);

// Protected — admin only
router.get('/', protect, getCommissions);
router.get('/:id', protect, getCommission);
router.patch('/:id/status', protect, updateCommissionStatus);

module.exports = router;
