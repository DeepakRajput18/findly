const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Match Found', 'Item Update', 'Message'],
    required: true
  },
  read_status: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  resource_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'resource_model'
  },
  resource_model: {
    type: String,
    enum: ['Match', 'LostItem', 'FoundItem', 'Message'],
    required: function() {
      return this.resource_id != null;
    }
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; 