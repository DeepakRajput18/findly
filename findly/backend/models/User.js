const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  phone: {
    type: String,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String
  },
  profileImage: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  resetCode: {
    type: String
  },
  resetCodeExpires: {
    type: Date
  },
  resetOTP: {
    type: String
  },
  resetOTPExpiry: {
    type: Date
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 