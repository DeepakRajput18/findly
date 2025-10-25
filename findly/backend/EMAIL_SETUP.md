# Email Configuration Guide

## To enable email functionality, create a `.env` file in the backend directory with the following:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=mongodb://localhost:27017/findly
ADMIN_SECRET_KEY=admin123
NODE_ENV=development
PORT=5001
```

## Gmail Setup Instructions:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password (not your regular Gmail password)

3. **Update the .env file** with your actual email and app password

## Alternative Email Services:

You can also use other email services by modifying the transporter configuration in `services/emailService.js`:

- **Outlook/Hotmail**: Use `service: 'hotmail'`
- **Yahoo**: Use `service: 'yahoo'`
- **Custom SMTP**: Use `host`, `port`, `secure` options

## Testing:

Once configured, the reset codes will be sent to actual email addresses instead of just being logged to the console.
