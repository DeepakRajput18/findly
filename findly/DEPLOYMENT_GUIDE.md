# 🚀 Findly Deployment Guide

This guide covers deploying your Findly application to production.

## 📋 Prerequisites

- ✅ MongoDB Atlas account with cluster created
- ✅ Node.js and npm installed
- ✅ Git repository

---

## 🔧 Step 1: MongoDB Atlas Configuration

### 1.1 Update Password in Connection String

**Important:** Your MongoDB Atlas connection string is:

```
mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with your actual database password.

**If your password has special characters**, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`
- `&` → `%26`

**Example:**
- Password: `Deepak@123`
- Encoded: `Deepak%40123`
- Connection String: `mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongिन्द्रे.net/findly?retryWrites=true&w=majority`

Use https://www.urlencoder.org/ to encode special characters.

### 1.2 Update .env File

1. Open `backend/.env`
2. Replace `YOUR_PASSWORD` with your encoded password
3. Save the file

### 1.3 Test Connection

```bash
cd backend
npm install
npm start
```

Look for: `✅ Connected to MongoDB`

---

## 🐳 Option A: Deploy Locally with Docker

### Quick Start

**Windows:**
```bash
docker-run.bat
```

**Linux/Mac:**
```bash
chmod +x docker-run.sh
./docker-run.sh
```

**Manual:**
```bash
docker-compose up --build -d
```

### Access
- 🌐 Frontend: http://localhost
- 🔧 API: http://localhost/health

### Stop Services
```bash
docker-compose down
```

---

## ☁️ Option B: Deploy to Render.com (Production)

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up for free account
3. Connect your GitHub repository

### 2.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:

**Settings:**
- **Name**: `findly-backend`
- **Root Directory**: `findly/findly/backend`
- **Environment**: `Node`
- **Build Command**: `npm install --production`
- **Start Command**: `npm start`

### 2.3 Environment Variables (CRITICAL)

Go to **Environment** tab and add:

```
MONGODB_URI=mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
JWT_SECRET=findly_secret_key_change_in_production_12345
NODE_ENV=production
PORT=5001
```

**Replace `YOUR_PASSWORD` with your encoded password!**

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (2-3 minutes)
3. Your backend will be live at: `https://findly-backend.onrender.com`

### 2.5 Deploy Frontend

Create a **Static Site**:

1. Click **"New +"** → **"Static Site"**
2. Connect repository
3. Configure:
   - **Name**: `findly-frontend`
   - **Root Directory**: `findly/findly/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add environment variable for API URL:
```
VITE_API_URL=https://findly-backend.onrender.com
```

### 2.6 Update Frontend API Configuration

Update `frontend/src/services/api.js` to use production URL:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://findly-backend.onrender.com/api';
```

---

## 🔍 Testing Deployment

### Health Check
```bash
curl https://findly-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 123.45,
  "mongodb_uri": "configured"
}
```

### Test API Endpoints
```bash
# Test registration
curl -X POST https://findly-backend.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

---

## 🔐 Security Checklist

Before production deployment:

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Use MongoDB Atlas IP whitelist (restrict to Render IPs)
- [ ] Enable HTTPS on Render
- [ ] Update CORS settings in server.js to only allow your frontend domain
- [ ] Remove console.log statements in production code

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoDB connection error`

**Solutions:**
1. Verify password is correct and URL-encoded
2. Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)
3. Verify database user has correct permissions
4. Check connection string format

### Build Failed on Render

**Error:** Build timeout or npm install failed

**Solutions:**
1. Check Root Directory is correct (`findly/findly/backend`)
2. Verify package.json exists
3. Check Build Command is correct
4. Increase build timeout in Render settings

### CORS Errors

**Error:** CORS policy error in browser

**Solution:** Update CORS in `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://findly-frontend.onrender.com'],
  credentials: true
}));
```

---

## 📊 Monitoring

### View Logs

**Render:**
```bash
# In Render dashboard, click "Logs" tab
```

**Local:**
```bash
docker-compose logs -f backend
```

### Database Usage

- Monitor MongoDB Atlas Dashboard
- Free tier: 512MB storage
- Upgrade if needed

---

## 🎉 Success!

Once deployed, your application will be:
- ✅ Accessible worldwide
- ✅ Using cloud database
- ✅ Automatically restarts on failure
- ✅ HTTPS enabled

### Your URLs:
- Backend: `https://findly-backend.onrender.com`
- Frontend: `https://findly-frontend.onrender.com`
- Database: MongoDB Atlas

---

## 📞 Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Render Docs: https://render.com/docs
- Docker Docs: https://docs.docker.com

---

**Good luck with your deployment! 🚀**

