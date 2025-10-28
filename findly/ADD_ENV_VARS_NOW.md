# ⚡ Add Environment Variables to Fix MongoDB Error

## Current Status
✅ Frontend is loading (CSS/JS requests working)
❌ MongoDB authentication failing (needs environment variables)

---

## 🎯 Add These 4 Variables in Render (COPY EXACTLY)

### Step 1: Go to Render Environment Tab
👉 https://dashboard.render.com
👉 Click "findly-app" 
👉 Click "Environment" tab (left sidebar)

### Step 2: Click "Add Environment Variable" 4 Times

**1. MONGODB_URI:**
```
Key: MONGODB_URI
Value: mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

**2. JWT_SECRET:**
```
Key: JWT_SECRET
Value: findly_secret_key_change_in_production_12345
```

**3. NODE_ENV:**
```
Key: NODE_ENV
Value: production
```

**4. PORT:**
```
Key: PORT
Value: 10000
```

### Step 3: Save and Deploy
Click "Save Changes" → Render auto-deploys → Wait 3 minutes

---

## ⚠️ IMPORTANT

**Copy this EXACT string for MONGODB_URI:**
```
mongodb+srv://findly-user:Deepak%40123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

Do NOT change:
- `Deepak%40123` (this is your encoded password)
- The `@` is already URL-encoded as `%40`

---

## ✅ After Adding Variables

1. Logs will show: `✅ Connected to MongoDB`
2. Visit: https://findly-app.onrender.com
3. App will work! 🎉

---

**That's it! Just add those 4 variables! 🚀**

