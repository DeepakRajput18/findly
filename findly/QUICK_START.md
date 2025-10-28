# 🚀 Quick Start - Deploy Findly in 5 Minutes

## ✅ Step 1: Set Up MongoDB Connection

1. **Create `.env` file** in `findly/findly/backend/` directory:

```env
MONGODB_URI=mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
JWT_SECRET=findly_secret_key_change_in_production_12345
PORT=5001
NODE_ENV=development
```

2. **Replace `YOUR_PASSWORD`** with your actual database password.
   - If password has special characters, encode them:
     - `@` → `%40`
     - `#` → `%23`
     - Use: https://www.urlencoder.org/

3. **Test connection:**
```bash
cd findly/findly
node test-mongodb-connection.js
```

Expected output:
```
✅ MongoDB connected successfully!
📊 Connected to database: findly
📁 Found 0 collections in database
✅ Connection test completed successfully!
```

---

## 🐳 Step 2A: Run Locally with Docker (Easiest)

**Windows:**
```bash
docker-run.bat
```

**Linux/Mac:**
```bash
chmod +x docker-run.sh
./docker-run.sh
```

**Access:**
- Frontend: http://localhost
- API: http://localhost/api

---

## ☁️ Step 2B: Deploy to Production (Render.com)

### Backend Setup

1. **Go to Render.com** → Sign up → Connect GitHub repo

2. **Create Web Service:**
   - Name: `findly-backend`
   - Root Directory: `findly/findly/backend`
   - Build Command: `npm install --production`
   - Start Command: `npm start`

3. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://findly-user:YOUR_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
   JWT_SECRET=findly_secret_key_change_in_production_12345
   NODE_ENV=production
   PORT=5001
   ```

4. **Deploy!** ✅

### Frontend Setup

1. **Create Static Site:**
   - Name: `findly-frontend`
   - Root Directory: `findly/findly/frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist总共`

2. **Add Environment Variable:**
   ```
   VITE_API_URL=https://findly-backend.onrender.com
   ```

3. **Deploy!** ✅

---

## 🎯 Verify Deployment

**Health check:**
```bash
curl https://findly-backend.onrender.com/health
```

Expected:
```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 123.45
}
```

---

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

---

## 🆘 Common Issues

**MongoDB Connection Failed?**
- Check password is correct and URL-encoded
- Verify Network Access in MongoDB Atlas allows `0.0.0.0/0`

**Build Failed on Render?**
- Check Root Directory is `findly/findly/backend`
- Verify .env variables are set

**CORS Errors?**
- Update CORS origin in `backend/server.js` to your frontend URL

---

**You're ready to deploy! 🚀**

