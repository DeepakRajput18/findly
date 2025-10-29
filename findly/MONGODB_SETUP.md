# MongoDB Setup Instructions for Findly

## Quick Setup Steps:

### 1. Create MongoDB Atlas Account (Free)
- Go to: https://www.mongodb.com/atlas
- Sign up with your email
- Create free cluster (M0 Sandbox)

### 2. Configure Database
- Database Name: findly
- Username: findly-user
- Password: [generate secure password]

### 3. Network Access
- Add IP Address: 0.0.0.0/0 (allow all)

### 4. Get Connection String
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string

### 5. Update Render Environment
- Go to your Render service
- Environment tab
- Update MONGODB_URI with your connection string

### 6. Redeploy
- Manual deploy latest commit
- Wait for completion

## Example Connection String:
mongodb+srv://findly-user:password123@cluster0.abc123.mongodb.net/findly?retryWrites=true&w=majority

## Your App URL:
https://findly-app.onrender.com











