const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  forgotPasswordOTP,
  verifyOTP,
  resetPasswordOTP
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log(`Creating uploads directory from routes: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add middleware to log upload errors
const handleUpload = (req, res, next) => {
  upload.single('profileImage')(req, res, function(err) {
    if (err) {
      console.error('Multer upload error:', err);
      return res.status(400).json({ message: `File upload error: ${err.message}` });
    }
    
    console.log('File upload middleware processed successfully');
    console.log('Request file after upload middleware:', req.file);
    next();
  });
};

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Password reset routes (old system)
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);

// OTP-based password reset routes
router.post('/auth/forgot-password', forgotPasswordOTP);
router.post('/auth/verify-otp', verifyOTP);
router.post('/auth/reset-password', resetPasswordOTP);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, handleUpload, updateUserProfile);

module.exports = router; 