# 📧 Gmail SMTP Setup Guide for Findly

## **Complete Gmail Configuration for Forgot Password Feature**

### **Step 1: Enable 2-Factor Authentication on Gmail**

1. **Go to Google Account Security:**
   - Visit: https://myaccount.google.com/security
   - Sign in with your Gmail account

2. **Enable 2-Step Verification:**
   - Click on "2-Step Verification"
   - Follow the setup process
   - You'll need your phone number for verification

### **Step 2: Generate App Password**

1. **Go to App Passwords:**
   - Visit: https://myaccount.google.com/apppasswords
   - You may need to sign in again

2. **Create App Password:**
   - Select "Mail" from the dropdown
   - Select "Other (custom name)" 
   - Enter "Findly App" as the name
   - Click "Generate"

3. **Copy the 16-character password:**
   - Example: `abcd efgh ijkl mnop`
   - **Important:** Copy this password immediately - you won't see it again!

### **Step 3: Update Environment Variables**

1. **Open your .env file:**
   ```
   findly/backend/.env
   ```

2. **Update with your Gmail credentials:**
   ```env
   # Gmail Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   
   # Other configurations
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
   MONGODB_URI=mongodb://localhost:27017/findly
   PORT=5001
   NODE_ENV=development
   ```

3. **Example configuration:**
   ```env
   EMAIL_USER=deepakrajput91825@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   JWT_SECRET=my-super-secret-jwt-key-2024
   ```

### **Step 4: Restart Backend Server**

1. **Stop the current server:**
   - Press `Ctrl+C` in the terminal where backend is running

2. **Start the server again:**
   ```bash
   cd findly/backend
   npm start
   ```

3. **Check the console output:**
   - You should see: `📧 Using Gmail SMTP for email delivery`
   - If you see Ethereal Email message, check your .env file

### **Step 5: Test Email Delivery**

1. **Go to your application:**
   - Visit: http://localhost:5173/forgot-password

2. **Enter your email address:**
   - Use the same email you configured in EMAIL_USER

3. **Check your Gmail inbox:**
   - Look for email from "Findly Support"
   - Check spam folder if not in inbox
   - The email should arrive within 30 seconds

### **Troubleshooting Common Issues**

#### **Issue 1: "Invalid login" error**
- **Solution:** Make sure you're using the App Password, not your regular Gmail password
- **Check:** The password should be 16 characters with spaces (e.g., `abcd efgh ijkl mnop`)

#### **Issue 2: "Less secure app access" error**
- **Solution:** This is normal - use App Passwords instead of enabling less secure apps
- **Check:** Make sure 2-factor authentication is enabled

#### **Issue 3: Emails not arriving**
- **Check spam folder:** Gmail might filter the emails
- **Check console logs:** Look for error messages in the backend terminal
- **Verify email address:** Make sure the email exists in your database

#### **Issue 4: "Authentication failed" error**
- **Solution:** Regenerate the App Password
- **Steps:** Go back to App Passwords, delete the old one, create a new one

### **Security Best Practices**

1. **Never share your App Password**
2. **Keep your .env file secure**
3. **Don't commit .env to version control**
4. **Use different passwords for different environments**
5. **Regularly rotate your App Passwords**

### **Testing the Complete Flow**

1. **Request Password Reset:**
   - Go to http://localhost:5173/forgot-password
   - Enter your registered email
   - Click "Send OTP"

2. **Check Email:**
   - Open your Gmail inbox
   - Look for email from "Findly Support"
   - Note the 6-digit OTP code

3. **Verify OTP:**
   - Go to http://localhost:5173/verify-otp
   - Enter the OTP from your email
   - Click "Verify"

4. **Reset Password:**
   - Go to http://localhost:5173/reset-password
   - Enter new password
   - Confirm password
   - Click "Reset Password"

5. **Login with New Password:**
   - Go to http://localhost:5173/login
   - Enter your email and new password
   - Click "Login"

### **Success Indicators**

✅ **Backend console shows:** `📧 Using Gmail SMTP for email delivery`  
✅ **Email arrives in Gmail inbox within 30 seconds**  
✅ **Email has professional formatting with Findly branding**  
✅ **OTP verification works correctly**  
✅ **Password reset completes successfully**  

### **Need Help?**

If you're still having issues:

1. **Check the backend console** for error messages
2. **Verify your .env file** has the correct credentials
3. **Test with a simple email** first
4. **Check Gmail's security settings** are properly configured

**Your Gmail SMTP setup is now complete and ready for production use!** 🚀


