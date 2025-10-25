const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail, sendPasswordResetSMS, sendOTPEmail } = require('../services/emailService');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, profile, isAdmin, adminSecretKey } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate admin registration using env var
    let userIsAdmin = false;
    if (isAdmin) {
      const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin123';
      if (ADMIN_SECRET_KEY === 'admin123') {
        console.warn('Warning: using default ADMIN_SECRET_KEY. Set ADMIN_SECRET_KEY in environment for production.');
      }

      if (adminSecretKey !== ADMIN_SECRET_KEY) {
        return res.status(401).json({ message: 'Invalid admin secret key' });
      }

      userIsAdmin = true;
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      profile,
      isAdmin: userIsAdmin
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    // Debug logs
    console.log('Update profile request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request headers:', req.headers);
    
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      // Handle profile image upload
      if (req.file) {
        console.log('Profile image file received:', req.file.filename);
        console.log('Full file details:', req.file);
        
        // Make sure to use the correct path format for the OS
        const profileImagePath = `/uploads/${req.file.filename}`;
        console.log('Setting profileImage path to:', profileImagePath);
        
        user.profileImage = profileImagePath;
      } else {
        console.log('No profile image file received');
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log('User updated successfully:', updatedUser);
      console.log('Profile image in updated user:', updatedUser.profileImage);

      const userResponse = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      };
      
      console.log('Sending user response:', userResponse);
      res.json(userResponse);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email, phone, method } = req.body;

    if (!method || (method === 'email' && !email) || (method === 'sms' && !phone)) {
      return res.status(400).json({ message: 'Please provide email or phone number' });
    }

    // Find user by email or phone
    const query = method === 'email' ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store reset code in user document (you might want to create a separate collection for this)
    user.resetCode = resetCode;
    user.resetCodeExpires = resetCodeExpires;
    await user.save();

    // In a real application, you would send email/SMS here
    // For demo purposes, we'll just log the code
    console.log(`Reset code for ${method === 'email' ? email : phone}: ${resetCode}`);

    // Send email or SMS based on method
    let sendResult;
    if (method === 'email') {
      sendResult = await sendPasswordResetEmail(email, resetCode);
      if (!sendResult.success) {
        console.error('Failed to send email:', sendResult.error);
        return res.status(500).json({ 
          message: 'Failed to send reset code. Please try again later.' 
        });
      }
    } else {
      sendResult = await sendPasswordResetSMS(phone, resetCode);
      if (!sendResult.success) {
        console.error('Failed to send SMS:', sendResult.error);
        return res.status(500).json({ 
          message: 'Failed to send reset code. Please try again later.' 
        });
      }
    }

    res.status(200).json({
      message: `Reset code sent to your ${method === 'email' ? 'email' : 'phone'}`,
      // For development only - remove in production
      resetCode: process.env.NODE_ENV === 'development' ? resetCode : undefined,
      // Also return code if email service is not configured
      ...(sendResult.resetCode && { resetCode: sendResult.resetCode }),
      // Return preview URL for testing
      ...(sendResult.previewUrl && { previewUrl: sendResult.previewUrl })
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Verify reset code
// @route   POST /api/users/verify-reset-code
// @access  Public
const verifyResetCode = async (req, res) => {
  try {
    const { email, phone, code, method } = req.body;

    if (!code || code.length !== 6) {
      return res.status(400).json({ message: 'Please provide a valid 6-digit code' });
    }

    // Find user by email or phone
    const query = method === 'email' ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if reset code exists and is valid
    if (!user.resetCode || !user.resetCodeExpires) {
      return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
    }

    if (new Date() > user.resetCodeExpires) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    res.status(200).json({ message: 'Reset code verified successfully' });

  } catch (error) {
    console.error('Error verifying reset code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, phone, code, newPassword, method } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Find user by email or phone
    const query = method === 'email' ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify reset code again
    if (!user.resetCode || !user.resetCodeExpires) {
      return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
    }

    if (new Date() > user.resetCodeExpires) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    // Update password
    user.password = newPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Forgot Password with OTP
const forgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Save OTP to user
    user.resetOTP = otp.toString();
    user.resetOTPExpiry = new Date(otpExpiry);
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp);
    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
      return res.status(500).json({ 
        message: 'Failed to send OTP. Please try again later.' 
      });
    }

    res.status(200).json({
      message: 'OTP sent to your email',
      previewUrl: emailResult.previewUrl // For testing
    });

  } catch (error) {
    console.error('Error in forgot password OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and is not expired
    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Enhanced OTP expiration check
    if (Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    res.status(200).json({
      message: 'OTP verified successfully',
      token: generateToken(user._id) // Generate temporary token for password reset
    });

  } catch (error) {
    console.error('Error in verify OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset Password with OTP
const resetPasswordOTP = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    // Password validation
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP again
    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Enhanced OTP expiration check
    if (Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Error in reset password OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  forgotPasswordOTP,
  verifyOTP,
  resetPasswordOTP,
}; 