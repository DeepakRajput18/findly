const fs = require('fs');
const path = require('path');

console.log('🔧 ENVIRONMENT SETUP FOR FORGOT PASSWORD + OTP');
console.log('==============================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/findly
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5001
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!\n');
} else {
  console.log('✅ .env file already exists\n');
}

console.log('📧 GMAIL EMAIL SETUP INSTRUCTIONS:');
console.log('===================================\n');

console.log('1. 🔐 ENABLE 2-FACTOR AUTHENTICATION:');
console.log('   • Go to: https://myaccount.google.com/security');
console.log('   • Turn on "2-Step Verification"');
console.log('   • Follow the setup process\n');

console.log('2. 🔑 GENERATE APP PASSWORD:');
console.log('   • Go to: https://myaccount.google.com/apppasswords');
console.log('   • Select "Mail" and "Other (custom name)"');
console.log('   • Enter "Findly App" as the name');
console.log('   • Copy the generated 16-character password\n');

console.log('3. 📝 UPDATE .env FILE:');
console.log('   • Open: findly/backend/.env');
console.log('   • Replace "your_email@gmail.com" with your Gmail address');
console.log('   • Replace "your_app_password" with the 16-character app password\n');

console.log('4. 🔄 RESTART BACKEND SERVER:');
console.log('   • Stop the backend server (Ctrl+C)');
console.log('   • Run: npm start\n');

console.log('📋 EXAMPLE .env CONFIGURATION:');
console.log('===============================');
console.log('EMAIL_USER=deepakrajput91825@gmail.com');
console.log('EMAIL_PASS=abcd efgh ijkl mnop');
console.log('JWT_SECRET=my-super-secret-jwt-key-2024');
console.log('');

console.log('⚠️  IMPORTANT SECURITY NOTES:');
console.log('============================');
console.log('• Never share your app password');
console.log('• Keep your .env file secure');
console.log('• Don\'t commit .env to version control');
console.log('• Use different passwords for different environments\n');

console.log('🚀 After setup, emails will be delivered to your inbox!');
console.log('   OTP codes will be sent via Gmail SMTP.\n');



