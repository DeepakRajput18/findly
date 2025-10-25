const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const adminEmail = 'admin@example.com';
const newPassword = 'password123';

async function resetPassword() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findly');
    console.log('Connected to MongoDB');
    
    console.log(`Resetting password for admin user: ${adminEmail}`);
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the admin user with the new password
    const result = await mongoose.connection.collection('users').updateOne(
      { email: adminEmail },
      { $set: { password: hashedPassword } }
    );
    
    if (result.matchedCount === 0) {
      console.log('No admin user found. Creating new admin user...');
      
      // Create a new admin user
      const newAdmin = {
        name: 'Admin User',
        email: adminEmail,
        phone: '555-555-5555',
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await mongoose.connection.collection('users').insertOne(newAdmin);
      console.log('Admin user created successfully');
    } else {
      console.log(`Admin password reset successfully for ${adminEmail}`);
    }
    
    // Verify the password hash
    const adminUser = await mongoose.connection.collection('users').findOne({ email: adminEmail });
    console.log('Admin user found:', {
      id: adminUser._id.toString(),
      email: adminUser.email,
      isAdmin: adminUser.isAdmin
    });
    
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
resetPassword(); 