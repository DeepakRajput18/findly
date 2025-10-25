const express = require('express');
const router = express.Router();
const {
  createFoundItem,
  getFoundItems,
  getMyFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
} = require('../controllers/foundItemController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getFoundItems);
router.get('/:id', getFoundItemById);

// Protected routes
router.post('/', protect, createFoundItem);
router.get('/user/myitems', protect, getMyFoundItems);
router.route('/:id')
  .put(protect, updateFoundItem)
  .delete(protect, deleteFoundItem);

module.exports = router; 