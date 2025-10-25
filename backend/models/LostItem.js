const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String
  },
  last_seen_location: {
    type: String,
    maxlength: 255
  },
  lost_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Lost', 'Found', 'Recovered'],
    default: 'Lost'
  },
  qr_code: {
    type: String
  },
  image_url: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem; 