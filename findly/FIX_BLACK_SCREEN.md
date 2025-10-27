# 🖥️ Fix Black Screen on Render Deployment

## Problem
Your app deployed but shows a **black screen** → Frontend is not being built or served.

## Root Cause
Render is only running the backend (`npm start`), but not building the frontend React app.

---

## ✅ Solution: Update Render Service Settings

### Step 1: Go to Render Dashboard
👉 https://dashboard.render.com

### Step 2: Select Your Service
👉 Click on "findly-app" service

### Step 3: Go to Settings
👉 Click **"Settings"** tab (in left sidebar)

### Step 4: Update Build & Start Commands

**Current settings (wrong):**
- Root Directory: `findly/findly`
- Build Command: (empty or `npm install`)
- Start Command: `npm start`

**Change to these:**

1. **Root Directory:**
   ```
   findly/findly
   ```

2. **Build Command:**
   ```
   npm run install-all && cd frontend && npm install && npm run build
   ```

3. **Start Command:**
   ```
   cd backend && npm start
   ```

### Step 5: Save Settings
👉 Click **"Save Changes"** button

### Step 6: Manual Deploy
After saving:
1. Go to **"Manual Deploy"** section
2. Click **"Deploy latest commit"**
3. Wait 3-5 minutes for build

---

## 🔍 Alternative: Check if Frontend Build Exists

### Test API Endpoint First

Visit:
```
https://findly-app.onrender.com/health
```

If this works, your backend is running. The frontend just isn't being served.

### Check Render Logs

1. Go to Render dashboard
2. Click your service
3. Click **"Logs"** tab
4. Look for errors like:
   - "Cannot find module 'react'"
   - "Frontend build failed"
   - "dist folder not found"

---

## 🚀 Complete Deployment Configuration for Render

Your service should have these settings:

### Service Settings:
- **Name:** `findly-app`
- **Environment:** `Node`
- **Root Directory:** `findly/findly`

### Build:
- **Build Command:** `npm run install-all && cd frontend && npm install && npm run build`
- **Clean Build:** Yes (enabled)

### Start:
- **Start Command:** `cd backend && npm start`

### Environment Variables:
```
MONGODB_URI=mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
JWT_SECRET=findly_secret_key_change_in_production_12345
NODE_ENV=production
PORT=10000
```

---

## ✅ After Updating Settings

1. **Deploy manually:**
   - Click "Manual Deploy"
   - Click "Deploy latest commit"
   
2. **Wait for build** (3-5 minutes):
   - Build logs should show frontend building
   - Look for: "Built at dist/" in logs

3. **Check deployment:**
   - Status should be "Live"
   - Logs should show "Server running on port 10000"

4. **Test your app:**
   - Visit: https://findly-app.onrender.com
   - Should see Findly app (not black screen!)

---

## 🐛 Common Issues

### Issue 1: "Cannot find frontend/dist"

**Fix:** Build command not running properly

**Solution:** Update build command to:
```bash
npm run install-all && cd frontend && npm install && npm run build
```

### Issue 2: "Module not found: Cannot resolve 'react'"

**Fix:** Frontend dependencies not installed

**Solution:** Make sure `install-all` script runs:
```bash
cd frontend && npm install
```

### Issue 3: Frontend builds but still black screen

**Fix:** API calls failing

**Solution:** Check CORS settings in backend/server.js

---

## 🎯 Quick Fix Summary

**What to change in Render:**

1. Go to: **Settings** → **Build & Deploy**
2. **Build Command:** 
   ```
   npm run install-all && cd frontend && npm install && npm run build
   ```
3. **Start Command:**
   ```
   cd backend && npm start
   ```
4. **Save & Deploy**

---

## 📊 Expected Build Log Output

When build is successful, you should see in logs:
```
✓ 45 modules transformed.
✓ built in 15.23s
dist/index.html    1.25 kB │ gzip: 0.52 kB
dist/assets/index-xxx.js   150 kB │ gzip: 40.2 kB
Server running on port 10000
Connected to MongoDB
```

---

**Follow these steps to fix the black screen! 🚀**
