const express = require('express');
const router = express.Router();
const {
  createLostItem,
  getLostItems,
  getMyLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
} = require('../controllers/lostItemController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getLostItems);
router.get('/:id', getLostItemById);

// Protected routes
router.post('/', protect, createLostItem);
router.get('/user/myitems', protect, getMyLostItems);
router.route('/:id')
  .put(protect, updateLostItem)
  .delete(protect, deleteLostItem);

module.exports = router; 