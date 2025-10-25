const express = require('express');
const router = express.Router();
const {
  addLocation,
  getItemLocation,
  getLocations,
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/:itemType', getLocations);

// Protected routes
router.post('/', protect, addLocation);
router.get('/:itemType/:itemId', protect, getItemLocation);

module.exports = router; 