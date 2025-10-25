const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Test credentials
const testEmail = 'admin@example.com';
const testPassword = 'password123';

console.log('Starting login verification script...');
console.log('Testing login for:', testEmail);

// Connect to MongoDB and verify login
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findly')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Find user by email
      const user = await User.findOne({ email: testEmail });
      
      if (!user) {
        console.error(`User with email ${testEmail} not found in database`);
        process.exit(1);
      }
      
      console.log('User found:', {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
      
      // Test password comparison directly
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Password match result:', isMatch);
      
      // Test the user's comparePassword method
      const methodMatch = await user.comparePassword(testPassword);
      console.log('User.comparePassword method result:', methodMatch);
      
      // If password doesn't match, create a fixed admin user with known credentials
      if (!isMatch || !methodMatch) {
        console.log('Creating a new admin user with verified credentials...');
        
        // Delete the existing admin user first
        await User.deleteOne({ email: testEmail });
        
        // Create new password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);
        
        // Create new admin user
        const newAdmin = await User.create({
          name: 'Admin User',
          email: testEmail,
          phone: '555-555-5555',
          password: hashedPassword,
          isAdmin: true
        });
        
        console.log('New admin user created:', {
          _id: newAdmin._id.toString(),
          name: newAdmin.name,
          email: newAdmin.email,
          isAdmin: newAdmin.isAdmin
        });

        // Verify the new user's password
        const newMatch = await newAdmin.comparePassword(testPassword);
        console.log('New admin password verification:', newMatch);
      } else {
        console.log('Admin credentials are valid!');
      }
      
    } catch (error) {
      console.error('Error during login verification:', error);
    } finally {
      // Close MongoDB connection
      console.log('Disconnecting from MongoDB...');
      await mongoose.disconnect();
      console.log('Done!');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 