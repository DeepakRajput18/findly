const Match = require('../models/Match');
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const Notification = require('../models/Notification');

// @desc    Create a new match
// @route   POST /api/matches
// @access  Private
const createMatch = async (req, res) => {
  try {
    const { lost_item_id, found_item_id, confidence_score } = req.body;

    // Verify that the items exist
    const lostItem = await LostItem.findById(lost_item_id);
    const foundItem = await FoundItem.findById(found_item_id);

    if (!lostItem || !foundItem) {
      return res.status(404).json({ message: 'Lost or found item not found' });
    }

    // Create the match
    const match = await Match.create({
      lost_item_id,
      found_item_id,
      confidence_score,
      match_status: 'Pending',
    });

    // Create notifications for both item owners
    await Notification.create({
      user_id: lostItem.user_id,
      message: `A potential match has been found for your lost item: ${lostItem.item_name}`,
      type: 'Match Found',
      resource_id: match._id,
      resource_model: 'Match',
    });

    await Notification.create({
      user_id: foundItem.user_id,
      message: `Your found item ${foundItem.item_name} might belong to someone`,
      type: 'Match Found',
      resource_id: match._id,
      resource_model: 'Match',
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all matches
// @route   GET /api/matches
// @access  Private (Admin)
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate({
        path: 'lost_item_id',
        select: 'item_name category description user_id',
        populate: {
          path: 'user_id',
          select: 'name email',
        },
      })
      .populate({
        path: 'found_item_id',
        select: 'item_name category description user_id',
        populate: {
          path: 'user_id',
          select: 'name email',
        },
      })
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's matches (where user is either the lost or found item owner)
// @route   GET /api/matches/mymatches
// @access  Private
const getMyMatches = async (req, res) => {
  try {
    // Find lost items owned by the user
    const userLostItems = await LostItem.find({ user_id: req.user._id }).select('_id');
    const userLostItemIds = userLostItems.map(item => item._id);

    // Find found items owned by the user
    const userFoundItems = await FoundItem.find({ user_id: req.user._id }).select('_id');
    const userFoundItemIds = userFoundItems.map(item => item._id);

    // Find matches where user is either the lost or found item owner
    const matches = await Match.find({
      $or: [
        { lost_item_id: { $in: userLostItemIds } },
        { found_item_id: { $in: userFoundItemIds } },
      ],
    })
      .populate({
        path: 'lost_item_id',
        select: 'item_name category description user_id',
        populate: {
          path: 'user_id',
          select: 'name email',
        },
      })
      .populate({
        path: 'found_item_id',
        select: 'item_name category description user_id',
        populate: {
          path: 'user_id',
          select: 'name email',
        },
      })
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get match by ID
// @route   GET /api/matches/:id
// @access  Private
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate({
        path: 'lost_item_id',
        select: 'item_name category description image_url user_id',
        populate: {
          path: 'user_id',
          select: 'name email phone',
        },
      })
      .populate({
        path: 'found_item_id',
        select: 'item_name category description image_url user_id',
        populate: {
          path: 'user_id',
          select: 'name email phone',
        },
      });

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Check if user is authorized to view this match
    const lostItemUserId = match.lost_item_id.user_id._id.toString();
    const foundItemUserId = match.found_item_id.user_id._id.toString();
    
    if (req.user._id.toString() !== lostItemUserId && req.user._id.toString() !== foundItemUserId) {
      return res.status(401).json({ message: 'Not authorized to view this match' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update match status
// @route   PUT /api/matches/:id
// @access  Private
const updateMatchStatus = async (req, res) => {
  try {
    const { match_status } = req.body;

    if (!['Pending', 'Confirmed', 'Rejected'].includes(match_status)) {
      return res.status(400).json({ message: 'Invalid match status' });
    }

    const match = await Match.findById(req.params.id)
      .populate('lost_item_id', 'user_id item_name')
      .populate('found_item_id', 'user_id item_name');

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Check if user is authorized to update this match
    const lostItemUserId = match.lost_item_id.user_id.toString();
    const foundItemUserId = match.found_item_id.user_id.toString();
    
    if (req.user._id.toString() !== lostItemUserId && req.user._id.toString() !== foundItemUserId) {
      return res.status(401).json({ message: 'Not authorized to update this match' });
    }

    match.match_status = match_status;
    const updatedMatch = await match.save();

    // If match is confirmed, update the status of the items
    if (match_status === 'Confirmed') {
      await LostItem.findByIdAndUpdate(match.lost_item_id._id, { status: 'Found' });
      await FoundItem.findByIdAndUpdate(match.found_item_id._id, { status: 'Claimed' });

      // Create notifications for both users
      await Notification.create({
        user_id: match.lost_item_id.user_id,
        message: `Your lost item ${match.lost_item_id.item_name} has been confirmed as found!`,
        type: 'Item Update',
        resource_id: match.lost_item_id._id,
        resource_model: 'LostItem',
      });

      await Notification.create({
        user_id: match.found_item_id.user_id,
        message: `Your found item ${match.found_item_id.item_name} has been claimed by its owner!`,
        type: 'Item Update',
        resource_id: match.found_item_id._id,
        resource_model: 'FoundItem',
      });
    }

    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMatch,
  getMatches,
  getMyMatches,
  getMatchById,
  updateMatchStatus,
}; 