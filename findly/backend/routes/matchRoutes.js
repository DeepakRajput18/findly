const express = require('express');
const router = express.Router();
const {
  createMatch,
  getMatches,
  getMyMatches,
  getMatchById,
  updateMatchStatus,
} = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

// All match routes are protected
router.route('/')
  .post(protect, createMatch)
  .get(protect, getMatches);

router.get('/mymatches', protect, getMyMatches);

router.route('/:id')
  .get(protect, getMatchById)
  .put(protect, updateMatchStatus);

module.exports = router; 