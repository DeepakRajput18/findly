const mongoose = require('mongoose');

const uri = 'mongodb+srv://findly-user:findly123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority';

console.log('🔍 Testing MongoDB connection...');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB connection: SUCCESS');
    console.log('✅ Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ MongoDB connection: FAILED');
    console.log('❌ Error:', err.message);
    console.log('');
    console.log('🔧 SOLUTION:');
    console.log('1. Go to https://cloud.mongodb.com');
    console.log('2. Database Access → findly-user → Edit');
    console.log('3. Reset password to: Findly123');
    console.log('4. Save changes');
    console.log('5. Run this test again');
    process.exit(1);
  });
