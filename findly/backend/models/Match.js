const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  lost_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LostItem',
    required: true
  },
  found_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem',
    required: true
  },
  confidence_score: {
    type: Number,
    required: true
  },
  match_status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rejected'],
    default: 'Pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match; 