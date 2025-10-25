const LostItem = require('../models/LostItem');

// @desc    Create a new lost item
// @route   POST /api/lost-items
// @access  Private
const createLostItem = async (req, res) => {
  try {
    const {
      item_name,
      category,
      description,
      last_seen_location,
      lost_date,
      image_url,
    } = req.body;

    const lostItem = await LostItem.create({
      user_id: req.user._id,
      item_name,
      category,
      description,
      last_seen_location,
      lost_date,
      image_url,
      status: 'Lost',
    });

    res.status(201).json(lostItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all lost items
// @route   GET /api/lost-items
// @access  Public
const getLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find({})
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's lost items
// @route   GET /api/lost-items/myitems
// @access  Private
const getMyLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lost item by ID
// @route   GET /api/lost-items/:id
// @access  Public
const getLostItemById = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id)
      .populate('user_id', 'name email phone');

    if (lostItem) {
      res.json(lostItem);
    } else {
      res.status(404).json({ message: 'Lost item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lost item
// @route   PUT /api/lost-items/:id
// @access  Private
const updateLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

    // Check if user owns the lost item
    if (lostItem.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this item' });
    }

    const {
      item_name,
      category,
      description,
      last_seen_location,
      lost_date,
      status,
      image_url,
    } = req.body;

    lostItem.item_name = item_name || lostItem.item_name;
    lostItem.category = category || lostItem.category;
    lostItem.description = description || lostItem.description;
    lostItem.last_seen_location = last_seen_location || lostItem.last_seen_location;
    lostItem.lost_date = lost_date || lostItem.lost_date;
    lostItem.status = status || lostItem.status;
    lostItem.image_url = image_url || lostItem.image_url;

    const updatedLostItem = await lostItem.save();
    res.json(updatedLostItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lost item
// @route   DELETE /api/lost-items/:id
// @access  Private
const deleteLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

    // Check if user owns the lost item
    if (lostItem.user_id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this item' });
    }

    await LostItem.deleteOne({ _id: req.params.id });
    res.json({ message: 'Lost item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLostItem,
  getLostItems,
  getMyLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
}; 