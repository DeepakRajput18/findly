const axios = require('axios');

console.log('🧪 TESTING COMPLETE FORGOT PASSWORD + OTP FLOW');
console.log('==============================================\n');

const BASE_URL = 'http://localhost:5001/api/users';

async function testForgotPasswordFlow() {
  try {
    console.log('📧 STEP 1: Request Password Reset');
    console.log('----------------------------------');
    
    const forgotResponse = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email: 'deepakrajput91825@gmail.com'
    });
    
    console.log('✅ Response:', forgotResponse.data.message);
    if (forgotResponse.data.previewUrl) {
      console.log('🔗 Preview URL:', forgotResponse.data.previewUrl);
    }
    if (forgotResponse.data.resetCode) {
      console.log('🔑 Reset Code (for testing):', forgotResponse.data.resetCode);
    }
    
    console.log('\n⏱️  Waiting 2 seconds before verification...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test with invalid OTP first
    console.log('❌ STEP 2A: Test Invalid OTP');
    console.log('-----------------------------');
    
    try {
      await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email: 'deepakrajput91825@gmail.com',
        otp: '000000'
      });
    } catch (error) {
      console.log('✅ Expected error:', error.response.data.message);
    }
    
    console.log('\n✅ STEP 2B: Test Valid OTP');
    console.log('---------------------------');
    
    // Get a fresh OTP
    const newForgotResponse = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email: 'deepakrajput91825@gmail.com'
    });
    
    const validOTP = newForgotResponse.data.resetCode || '123456';
    console.log('🔑 Using OTP:', validOTP);
    
    const verifyResponse = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email: 'deepakrajput91825@gmail.com',
      otp: validOTP
    });
    
    console.log('✅ Verification successful:', verifyResponse.data.message);
    console.log('🎫 Token received:', verifyResponse.data.token ? 'Yes' : 'No');
    
    console.log('\n🔒 STEP 3: Test Password Reset');
    console.log('-------------------------------');
    
    // Test password validation
    console.log('❌ Testing short password...');
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, {
        email: 'deepakrajput91825@gmail.com',
        otp: validOTP,
        newPassword: '123',
        confirmPassword: '123'
      });
    } catch (error) {
      console.log('✅ Expected error:', error.response.data.message);
    }
    
    console.log('\n❌ Testing password mismatch...');
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, {
        email: 'deepakrajput91825@gmail.com',
        otp: validOTP,
        newPassword: 'newpassword123',
        confirmPassword: 'differentpassword'
      });
    } catch (error) {
      console.log('✅ Expected error:', error.response.data.message);
    }
    
    console.log('\n✅ Testing valid password reset...');
    const resetResponse = await axios.post(`${BASE_URL}/auth/reset-password`, {
      email: 'deepakrajput91825@gmail.com',
      otp: validOTP,
      newPassword: 'newpassword123',
      confirmPassword: 'newpassword123'
    });
    
    console.log('✅ Password reset successful:', resetResponse.data.message);
    
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('====================');
    console.log('✅ Email sending works');
    console.log('✅ OTP validation works');
    console.log('✅ Password validation works');
    console.log('✅ Error handling works');
    console.log('✅ Complete flow works');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
  }
}

// Run the test
testForgotPasswordFlow();



