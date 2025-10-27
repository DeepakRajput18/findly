const mongoose = require('mongoose');
require('dotenv').config();

// Get the connection string from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  console.log('Please create a .env file in the backend directory with:');
  console.log('MONGODB_URI=mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority');
  process.exit(1);
}

// Connect to MongoDB
async function testConnection() {
  console.log('🔗 Testing MongoDB connection...');
  console.log('URI:', uri.replace(/\/\/findly-user:[^@]+@/, '//findly-user:***@')); // Hide password in logs
  
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Connected to database:', mongoose.connection.name);
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections in database`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Tip: Check your username and password in the connection string');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('💡 Tip: Check your cluster URL is correct');
    } else if (error.message.includes('bad auth')) {
      console.error('💡 Tip: Make sure your password is URL-encoded if it contains special characters');
    }
    
    process.exit(1);
  }
}

testConnection();
