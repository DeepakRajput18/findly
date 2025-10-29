# 🖥️ COMPLETE Black Screen Fix

## Root Causes of Black Screen:

1. ❌ Frontend hardcoded to `localhost:5001` (won't work on Render)
2. ❌ No environment variable for API URL
3. ❌ MongoDB not connected (needs environment variables)

---

## ✅ Complete Solution (3 Steps)

### Step 1: Add Environment Variables in Render

**Go to:** https://dashboard.render.com → Your service → "Environment" tab

**Add these 5 variables:**

1. **MONGODB_URI:**
```
Key: MONGODB_URI
Value: mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

2. **JWT_SECRET:**
```
Key: JWT_SECRET
Value: findly_secret_key_change_in_production_12345
```

3. **NODE_ENV:**
```
Key: NODE_ENV
Value: production
```

4. **PORT:**
```
Key: PORT
Value: 10000
```

5. **VITE_API_URL (NEW!):**
```
Key: VITE_API_URL
Value: https://findly-app.onrender.com
```

**Click "Save Changes"**

---

### Step 2: Update Frontend to Use Environment Variable

I've already fixed the code:
- ✅ Updated `api.js` to use `import.meta.env.VITE_API_URL`
- ✅ Updated `AuthContext.jsx` to use environment variable
- ✅ This allows frontend to connect to Render backend

**The code is ready!**

---

### Step 3: Deploy

**Commit and push the changes:**

```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
git add frontend/src/services/api.js frontend/src/context/AuthContext.jsx
git commit -m "Fix black screen - use environment variable for API URL"
git push origin main
```

**Then in Render:**
- Settings → Manual Deploy → Deploy latest commit
- Wait 3-5 minutes

---

## 🎯 What This Fixes

### Before:
- Frontend hardcoded to `http://localhost:5001/api`
- On Render, this fails (localhost doesn't exist)
- Black screen appears

### After:
- Frontend uses `VITE_API_URL` environment variable
- Points to: `https://findly-app.onrender.com/api`
- Frontend connects to backend ✅
- App works! 🎉

---

## ✅ Expected Result

After all steps:

1. Visit: https://findly-app.onrender.com
2. See Findly app (NOT black screen!)
3. MongoDB connected
4. All features working

---

## 🔍 Verify It's Working

**Check browser console (F12):**
- Should NOT see network errors
- API calls should succeed
- Should NOT see "localhost:5001" errors

**Check Render logs:**
- Should see: `✅ Connected to MongoDB`
- Should see: `Server running on port 10000`

---

## 🚀 Quick Checklist

- [ ] Added MONGODB_URI
- [ ] Added JWT_SECRET
- [ ] Added NODE_ENV=production
- [ ] Added PORT=10000
- [ ] Added VITE_API_URL=https://findly-app.onrender.com
- [ ] Pushed code changes to GitHub
- [ ] Deployed on Render
- [ ] App works! 🎉

---

**Follow all 3 steps and black screen will be GONE! 🚀**


