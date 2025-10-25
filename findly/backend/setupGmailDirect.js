const fs = require('fs');
const path = require('path');

console.log('📧 GMAIL DIRECT EMAIL SETUP');
console.log('==========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env file...');
} else {
  console.log('📝 Updating .env file...');
}

const envContent = `# Gmail Configuration for Direct Email Delivery
EMAIL_USER=deepakrajput91825@gmail.com
EMAIL_PASS=your_16_character_app_password

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/findly
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

# Server Configuration
PORT=5001
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads`;

fs.writeFileSync(envPath, envContent);
console.log('✅ .env file updated successfully!\n');

console.log('🔧 GMAIL SETUP INSTRUCTIONS:');
console.log('============================\n');

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
console.log('   • Replace "your_16_character_app_password" with the App Password');
console.log('   • Example: EMAIL_PASS=abcd efgh ijkl mnop\n');

console.log('4. 🔄 RESTART BACKEND SERVER:');
console.log('   • Stop the backend server (Ctrl+C)');
console.log('   • Run: npm start\n');

console.log('📋 EXAMPLE .env CONFIGURATION:');
console.log('===============================');
console.log('EMAIL_USER=deepakrajput91825@gmail.com');
console.log('EMAIL_PASS=abcd efgh ijkl mnop');
console.log('');

console.log('🧪 TESTING STEPS:');
console.log('=================');
console.log('1. Go to: http://localhost:5173/forgot-password');
console.log('2. Enter your email address');
console.log('3. Check your Gmail inbox for the OTP email');
console.log('4. Use the OTP to reset your password');
console.log('');

console.log('⚠️  IMPORTANT SECURITY NOTES:');
console.log('============================');
console.log('• Use App Password, NOT your regular Gmail password');
console.log('• Keep your .env file secure and never share it');
console.log('• Don\'t commit .env to version control');
console.log('• Use different passwords for different environments\n');

console.log('🚀 After setup, emails will be delivered directly to your Gmail inbox!');
console.log('   No more Ethereal Email - real email delivery to users.\n');


