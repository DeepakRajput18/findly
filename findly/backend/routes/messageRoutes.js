const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getMyConversations,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// All message routes are protected
router.route('/')
  .post(protect, sendMessage)
  .get(protect, getMyConversations);

router.get('/:userId', protect, getConversation);

module.exports = router; 