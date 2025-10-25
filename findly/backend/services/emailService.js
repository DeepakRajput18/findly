const nodemailer = require('nodemailer');

// Create Gmail transporter for direct email delivery
const createTransporter = () => {
  try {
    // Validate Gmail credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Gmail credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env file');
    }

    console.log('📧 Using Gmail SMTP for direct email delivery');
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Error creating Gmail transporter:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetCode) => {
  try {
    console.log(`\n📧 SENDING EMAIL TO: ${email}`);
    console.log(`🔑 RESET CODE: ${resetCode}`);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Findly Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Findly Password Reset Code',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>Your OTP for password reset is: <b>${resetCode}</b></p>
        <p>This OTP expires in 5 minutes. Please do not share it with anyone.</p>
        <p>– Team Findly</p>
      `,
      text: `
        Password Reset Request
        
        Hello,
        
        Your OTP for password reset is: ${resetCode}
        
        This OTP expires in 5 minutes. Please do not share it with anyone.
        
        – Team Findly
      `
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ OTP email sent successfully to: ${email}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    
    return { 
      success: true, 
      messageId: result.messageId,
      message: 'OTP sent successfully to your email.'
    };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send SMS (placeholder - would need Twilio or similar service)
const sendPasswordResetSMS = async (phone, resetCode) => {
  try {
    // For now, just log the SMS (in production, integrate with Twilio, etc.)
    console.log(`SMS would be sent to ${phone} with code: ${resetCode}`);
    console.log(`SMS Content: "Your Findly password reset code is: ${resetCode}. This code expires in 10 minutes."`);
    
    // TODO: Implement actual SMS service
    // const twilio = require('twilio');
    // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // await client.messages.create({
    //   body: `Your Findly password reset code is: ${resetCode}. This code expires in 10 minutes.`,
    //   from: process.env.TWILIO_PHONE,
    //   to: phone
    // });
    
    return { success: true, message: 'SMS sent successfully' };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  try {
    console.log(`\n📧 SENDING OTP TO: ${email}`);
    console.log(`🔑 OTP CODE: ${otp}`);
    
    const transporter = await createTransporter();
    
    if (!transporter) {
      console.log(`❌ Failed to create email transporter`);
      return { 
        success: false, 
        error: 'Failed to create email transporter'
      };
    }
    
    const mailOptions = {
      from: `"Findly Support" <${process.env.EMAIL_USER || 'noreply@findly.com'}>`,
      to: email,
      subject: '🔍 Findly - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2196f3, #1976d2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🔍 Findly</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Lost & Found Platform</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Hello! We received a request to reset your password for your Findly account.
            </p>
            
            <div style="background: white; padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0; border: 2px solid #2196f3;">
              <p style="margin: 0 0 15px 0; color: #333; font-weight: bold;">Your OTP Code:</p>
              <div style="font-size: 32px; font-weight: bold; color: #2196f3; letter-spacing: 5px; background: #e3f2fd; padding: 15px; border-radius: 5px; display: inline-block;">
                ${otp}
              </div>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>⚠️ Important:</strong> This OTP will expire in 5 minutes. If you didn't request this reset, please ignore this email.
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Enter this OTP in the verification form to reset your password.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>This email was sent from Findly - Lost & Found Platform</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      `,
      text: `
        Findly - Password Reset OTP
        
        Hello! We received a request to reset your password for your Findly account.
        
        Your OTP Code: ${otp}
        
        This OTP will expire in 5 minutes. If you didn't request this reset, please ignore this email.
        
        Enter this OTP in the verification form to reset your password.
        
        ---
        Findly - Lost & Found Platform
      `
    };

    const result = await transporter.sendMail(mailOptions);
    
    // Get the preview URL for the sent email
    const previewUrl = nodemailer.getTestMessageUrl(result);
    
    console.log(`✅ OTP EMAIL SENT SUCCESSFULLY!`);
    console.log(`📧 Message ID: ${result.messageId}`);
    console.log(`🔗 Preview URL: ${previewUrl}`);
    console.log(`📱 You can view the email at: ${previewUrl}`);
    
    return { 
      success: true, 
      messageId: result.messageId,
      previewUrl: previewUrl,
      message: 'OTP email sent successfully! Check the preview URL to see the email.'
    };
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetSMS,
  sendOTPEmail
};
