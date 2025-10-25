const FoundItem = require('../models/FoundItem');

// @desc    Create a new found item
// @route   POST /api/found-items
// @access  Private
const createFoundItem = async (req, res) => {
  try {
    const {
      item_name,
      category,
      description,
      found_location,
      found_date,
      image_url,
    } = req.body;

    const foundItem = await FoundItem.create({
      user_id: req.user._id,
      item_name,
      category,
      description,
      found_location,
      found_date,
      image_url,
      status: 'Unclaimed',
    });

    res.status(201).json(foundItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all found items
// @route   GET /api/found-items
// @access  Public
const getFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({})
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's found items
// @route   GET /api/found-items/myitems
// @access  Private
const getMyFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get found item by ID
// @route   GET /api/found-items/:id
// @access  Public
const getFoundItemById = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id)
      .populate('user_id', 'name email phone');

    if (foundItem) {
      res.json(foundItem);
    } else {
      res.status(404).json({ message: 'Found item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update found item
// @route   PUT /api/found-items/:id
// @access  Private
const updateFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }

    // Check if user owns the found item
    if (foundItem.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this item' });
    }

    const {
      item_name,
      category,
      description,
      found_location,
      found_date,
      status,
      image_url,
    } = req.body;

    foundItem.item_name = item_name || foundItem.item_name;
    foundItem.category = category || foundItem.category;
    foundItem.description = description || foundItem.description;
    foundItem.found_location = found_location || foundItem.found_location;
    foundItem.found_date = found_date || foundItem.found_date;
    foundItem.status = status || foundItem.status;
    foundItem.image_url = image_url || foundItem.image_url;

    const updatedFoundItem = await foundItem.save();
    res.json(updatedFoundItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete found item
// @route   DELETE /api/found-items/:id
// @access  Private
const deleteFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }

    // Check if user owns the found item
    if (foundItem.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this item' });
    }

    await FoundItem.deleteOne({ _id: req.params.id });
    res.json({ message: 'Found item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFoundItem,
  getFoundItems,
  getMyFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
}; 