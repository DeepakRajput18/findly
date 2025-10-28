const mongoose = require('mongoose');

// Correctly encoded password (Deepak@123 becomes Deepak%40123)
const uri = 'mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority';

console.log('🔗 Testing MongoDB connection...');
console.log('Connection string (password hidden): mongodb+srv://findly-user:***@cluster0.hbjeybx.mongodb.net/findly\n');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Authentication failed. Please check:');
      console.error('   1. Username: findly-user');
      console.error('   2. Password: Deepak@123');
      console.error('   3. Database user exists in MongoDB Atlas');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 Network error. Please check:');
      console.error('   1. Internet connection');
      console.error('   2. MongoDB Atlas Network Access allows your IP');
      console.error('   3. Cluster URL is correct');
    }
    
    process.exit(1);
  });

