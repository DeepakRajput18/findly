#!/usr/bin/env node

/**
 * Interactive MongoDB Setup Script
 * Helps you configure MongoDB connection string
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function urlEncodePassword(password) {
  // URL encode special characters in password
  return encodeURIComponent(password);
}

async function setup() {
  console.log('\n🚀 MongoDB Atlas Setup for Findly\n');
  console.log('This script will help you configure your MongoDB connection.\n');

  // Get password
  const password = await question('Enter your MongoDB Atlas password for "findly-user": ');
  
  if (!password) {
    console.log('\n❌ Password cannot be empty!');
    process.exit(1);
  }

  // Encode password
  const encodedPassword = urlEncodePassword(password);
  
  // Build connection string
  const connectionString = `mongodb+srv://findly-user:${encodedPassword}@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority`;
  
  // Generate random JWT secret
  const jwtSecret = Array.from(crypto.randomBytes(32), byte => 
    byte.toString(16).padStart(2, '0')
  ).join('');

  // Create .env content
  const envContent = `# MongoDB Atlas Connection
# Generated: ${new Date().toISOString()}
MONGODB_URI=${connectionString}

# JWT Secret for authentication
JWT_SECRET=${jwtSecret}

# Server Configuration
PORT=5001
NODE_ENV=development

# Email Configuration (optional for forgot password feature)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
`;

  // Write .env file
  const envPath = path.join(__dirname, 'backend', '.env');
  
  try {
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('\n✅ Configuration saved to backend/.env');
    
    // Show summary (mask password)
    console.log('\n📋 Configuration Summary:');
    console.log('─────────────────────────────────────');
    console.log(`MongoDB URI: mongodb+srv://findly-user:***@cluster0.hbjeybx.mongodb.net/findly`);
    console.log(`Password: ${'*'.repeat(password.length)} (${encodedPassword !== password ? 'URL-encoded' : 'plain'})`);
    console.log(`JWT Secret: Generated (${jwtSecret.length} characters)`);
    console.log('─────────────────────────────────────\n');

    // Offer to test connection
    const testConnection = await question('Would you like to test the connection now? (y/n): ');
    
    if (testConnection.toLowerCase() === 'y' || testConnection.toLowerCase() === 'yes') {
      console.log('\n🔗 Testing MongoDB connection...\n');
      
      // Dynamically load and run test
      const mongoose = require('mongoose');
      
      try {
        await mongoose.connect(connectionString);
        console.log('✅ MongoDB connected successfully!');
        console.log('📊 Connected to database:', mongoose.connection.name);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📁 Found ${collections.length} collections in database`);
        
        await mongoose.connection.close();
        console.log('\n✅ Connection test completed successfully!');
        console.log('\n🎉 You are ready to deploy!\n');
      } catch (error) {
        console.error('\n❌ Connection test failed:', error.message);
        
        if (error.message.includes('authentication failed')) {
          console.error('\n💡 Tip: Please double-check your password');
        } else if (error.message.includes('bad auth')) {
          console.error('\n💡 Tip: Make sure the password is correct and user exists');
        }
      }
    } else {
      console.log('\n📝 To test the connection later, run:');
      console.log('   node test-mongodb-connection.js');
    }
    
  } catch (error) {
    console.error('\n❌ Error writing .env file:', error.message);
    process.exit(1);
  }
  
  rl.close();
}

// Run setup
setup().catch(error => {
  console.error('\n❌ Setup failed:', error);
  rl.close();
  process.exit(1);
});
