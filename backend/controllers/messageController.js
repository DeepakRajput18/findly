const Message = require('../models/Message');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    // Check if receiver exists
    const receiver = await User.findById(receiver_id);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Create message
    const message = await Message.create({
      sender_id: req.user._id,
      receiver_id,
      content,
    });

    // Create notification for receiver
    await Notification.create({
      user_id: receiver_id,
      message: `New message from ${req.user.name}`,
      type: 'Message',
      resource_id: message._id,
      resource_model: 'Message',
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get conversation between two users
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    const currentUserId = req.user._id;

    // Check if other user exists
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { sender_id: currentUserId, receiver_id: otherUserId },
        { sender_id: otherUserId, receiver_id: currentUserId },
      ],
    })
      .sort({ sent_at: 1 })
      .populate('sender_id', 'name email profile')
      .populate('receiver_id', 'name email profile');

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all conversations for the current user
// @route   GET /api/messages
// @access  Private
const getMyConversations = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get all messages where the current user is either sender or receiver
    const messages = await Message.find({
      $or: [
        { sender_id: currentUserId },
        { receiver_id: currentUserId },
      ],
    })
      .sort({ sent_at: -1 })
      .populate('sender_id', 'name email profile')
      .populate('receiver_id', 'name email profile');

    // Extract unique conversations
    const conversations = {};
    messages.forEach(message => {
      const otherUserId = message.sender_id._id.toString() === currentUserId.toString()
        ? message.receiver_id._id.toString()
        : message.sender_id._id.toString();

      if (!conversations[otherUserId]) {
        const otherUser = message.sender_id._id.toString() === currentUserId.toString()
          ? message.receiver_id
          : message.sender_id;

        conversations[otherUserId] = {
          user: otherUser,
          lastMessage: message,
        };
      }
    });

    res.json(Object.values(conversations));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getMyConversations,
}; 