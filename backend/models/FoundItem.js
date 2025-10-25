const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
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
  found_location: {
    type: String,
    required: true,
    maxlength: 255
  },
  found_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Claimed', 'Unclaimed'],
    default: 'Unclaimed'
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

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem; 