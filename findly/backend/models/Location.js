const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'item_type'
  },
  item_type: {
    type: String,
    required: true,
    enum: ['LostItem', 'FoundItem']
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location; 