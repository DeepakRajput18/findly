# 🔧 Fix Your Findly Deployment on Render

Your app is deployed at https://findly-app.onrender.com but it's not working. Follow these steps to fix it.

---

## ❌ Current Issues

1. MongoDB not connected
2. CORS not configured for Render domain
3. Environment variables missing

---

## ✅ Step-by-Step Fix

### Step 1: Get Your MongoDB Connection String

Your MongoDB Atlas connection string should be:

```
mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD` with your actual password.**

**Important:** If your password contains special characters like `@`, `#`, or `&`:
- Use: https://www.urlencoder.org/ to encode it
- Example: `Deepak@123` → `Deepak%40123`

---

### Step 2: Configure Environment Variables on Render

1. **Go to your Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Click on your service `findly-app`

2. **Go to Environment Tab:**
   - Look for "Environment" in the left sidebar
   - Click it

3. **Add These Environment Variables:**

Click "Add Environment Variable" for each:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority` |
| `JWT_SECRET` | `findly_secret_key_change_in_production_12345` |
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

**⚠️ IMPORTANT:**
- Replace `YOUR_PASSWORD` with your actual MongoDB password (URL-encoded)
- Render uses port `10000` by default for web services
- Do NOT include quotes around the values

---

### Step 3: Check Your MongoDB Atlas Settings

1. **Network Access:**
   - Go to: https://cloud.mongodb.com
   - Click "Network Access" in left menu
   - Make sure `0.0.0.0/0` is allowed (allows all IPs)
   - If not, click "Add IP Address" → "Allow Access from Anywhere"

2. **Database User:**
   - Go to "Database Access" in left menu
   - Make sure user `findly-user` exists
   - Password should be the one you're using in connection string

---

### Step 4: Deploy on Render

1. **After adding environment variables, Render will auto-deploy**
   - Or manually click "Manual Deploy" → "Deploy latest commit"

2. **Wait for deployment (2-3 minutes)**

3. **Check logs:**
   - Click "Logs" tab in Render dashboard
   - Look for: `✅ Connected to MongoDB`
   - Look for: `✅ Server running on port 10000`

---

### Step 5: Test Your Deployment

**Test health endpoint:**
```bash
curl https://findly-app.onrender.com/health
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

**Test API:**
```bash
curl https://findly-app.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

---

## 🐛 Troubleshooting

### Problem: Still shows "No MongoDB URI provided"

**Solution:**
1. Double-check environment variables in Render
2. Make sure variable name is exactly `MONGODB_URI` (case-sensitive)
3. Make sure value has no quotes
4. Redeploy after adding variables

### Problem: "MongoDB connection error"

**Solution:**
1. Check password is correct and URL-encoded
2. Verify Network Access allows all IPs (0.0.0.0/0)
3. Make sure database user exists
4. Check connection string format

### Problem: CORS errors in browser

**Solution:**
- Updated in server.js to allow `https://findly-app.onrender.com`
- Commit and push changes
- Trigger new deploy on Render

### Problem: Service keeps crashing

**Solution:**
1. Check logs in Render dashboard
2. Make sure PORT is set to 10000
3. Make sure JWT_SECRET is set
4. Check for errors in logs

---

## 📊 Verify Deployment

### Check Health:
```bash
curl https://findly-app.onrender.com/health
```

### Check MongoDB Connection:
In Render logs, you should see:
```
✅ Connected to MongoDB
📊 Database URL: mongodb+srv://findly-user:***@cluster0.hbjeybx.mongodb.net/findly
```

### Register a User:
```bash
curl -X POST https://findly-app.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@findly.com",
    "password": "password123",
    "name": "Admin User"
  }'
```

---

## 🎯 Complete Environment Variable List

Paste these EXACTLY in Render Environment tab:

```env
MONGODB_URI=mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
JWT_SECRET=findly_secret_key_change_in_production_12345
NODE_ENV=production
PORT=10000
```

---

## ✅ Success Checklist

- [ ] Environment variables added in Render
- [ ] MongoDB Atlas Network Access allows all IPs
- [ ] Database user `findly-user` exists
- [ ] Password is URL-encoded if needed
- [ ] Deployment completed successfully
- [ ] Health endpoint returns `{"status":"ok","db":"connected"}`
- [ ] Can register new users via API

---

## 🚀 Your URLs

- **App:** https://findly-app.onrender.com
- **Health Check:** https://findly-app.onrender.com/health
- **API:** https://findly-app.onrender.com/api

---

## 📞 Need Help?

**Check Render Logs:**
1. Go to Render Dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for error messages

**Common Log Messages:**
- ✅ Good: `Connected to MongoDB`
- ✅ Good: `Server running on port 10000`
- ❌ Bad: `No MongoDB URI provided` → Add MONGODB_URI env variable
- ❌ Bad: `MongoDB connection error` → Check password and network access
- ❌ Bad: `EADDRINUSE` → Change PORT to 10000

---

**Follow these steps and your app will be live! 🎉**


