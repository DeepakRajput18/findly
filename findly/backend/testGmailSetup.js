const axios = require('axios');

console.log('🧪 TESTING GMAIL SMTP SETUP');
console.log('============================\n');

async function testGmailSetup() {
  try {
    console.log('📧 STEP 1: Testing Forgot Password Request');
    console.log('--------------------------------------------');
    
    const response = await axios.post('http://localhost:5001/api/users/auth/forgot-password', {
      email: 'deepakrajput91825@gmail.com'
    });
    
    console.log('✅ Response:', response.data.message);
    
    if (response.data.previewUrl) {
      console.log('🔗 Preview URL:', response.data.previewUrl);
      console.log('📧 Note: Still using Ethereal Email - Gmail not configured yet');
    }
    
    console.log('\n🔧 GMAIL CONFIGURATION STATUS:');
    console.log('===============================');
    
    // Check if Gmail is configured
    if (response.data.previewUrl && response.data.previewUrl.includes('ethereal.email')) {
      console.log('❌ Gmail SMTP not configured');
      console.log('📝 To enable Gmail delivery:');
      console.log('   1. Enable 2-factor authentication on Gmail');
      console.log('   2. Generate App Password');
      console.log('   3. Update .env file with Gmail credentials');
      console.log('   4. Restart backend server');
    } else {
      console.log('✅ Gmail SMTP configured and working!');
    }
    
    console.log('\n📋 NEXT STEPS:');
    console.log('==============');
    console.log('1. Follow the Gmail setup instructions');
    console.log('2. Update your .env file with Gmail credentials');
    console.log('3. Restart the backend server');
    console.log('4. Test again to verify Gmail delivery');
    
    console.log('\n🎯 EXPECTED RESULT AFTER GMAIL SETUP:');
    console.log('====================================');
    console.log('• No preview URL (emails go to Gmail inbox)');
    console.log('• Console shows: "📧 Using Gmail SMTP for email delivery"');
    console.log('• Emails arrive in your Gmail inbox within 30 seconds');
    console.log('• Professional email formatting with Findly branding');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
  }
}

// Run the test
testGmailSetup();


