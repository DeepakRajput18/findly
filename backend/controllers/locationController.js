const Location = require('../models/Location');
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// @desc    Add or update location for an item
// @route   POST /api/locations
// @access  Private
const addLocation = async (req, res) => {
  try {
    const { item_id, item_type, latitude, longitude } = req.body;

    // Verify that the item exists and belongs to the user
    let item;
    if (item_type === 'LostItem') {
      item = await LostItem.findById(item_id);
    } else if (item_type === 'FoundItem') {
      item = await FoundItem.findById(item_id);
    } else {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if location already exists for this item
    let location = await Location.findOne({ item_id, item_type });

    if (location) {
      // Update existing location
      location.latitude = latitude;
      location.longitude = longitude;
      location.updated_at = Date.now();
      
      const updatedLocation = await location.save();
      res.json(updatedLocation);
    } else {
      // Create new location
      location = await Location.create({
        item_id,
        item_type,
        latitude,
        longitude,
        user_id: req.user._id
      });
      
      res.status(201).json(location);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get location for an item
// @route   GET /api/locations/:itemType/:itemId
// @access  Private
const getItemLocation = async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    // Verify that the item exists
    let item;
    if (itemType === 'lost') {
      item = await LostItem.findById(itemId);
    } else if (itemType === 'found') {
      item = await FoundItem.findById(itemId);
    } else {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const dbItemType = itemType === 'lost' ? 'LostItem' : 'FoundItem';
    
    // Get location for the item
    const location = await Location.findOne({ 
      item_id: itemId, 
      item_type: dbItemType 
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found for this item' });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all locations for items of a specific type
// @route   GET /api/locations/:itemType
// @access  Public
const getLocations = async (req, res) => {
  try {
    const { itemType } = req.params;
    
    if (itemType !== 'lost' && itemType !== 'found') {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    const dbItemType = itemType === 'lost' ? 'LostItem' : 'FoundItem';
    
    // Get all locations for the specified item type
    const locations = await Location.find({ item_type: dbItemType })
      .populate({
        path: 'item_id',
        select: 'item_name category description image_url',
      })
      .populate('user_id', 'name');

    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addLocation,
  getItemLocation,
  getLocations,
}; 