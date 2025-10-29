# ✅ Port Fixed! Restart Your Server Now

## Process on port 5001 has been killed! ✅

---

## Now Restart Your Server:

### Option 1: Run Backend Only
```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly\backend"
node server.js
```

### Option 2: Run Both (Backend + Frontend)
```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
npm run dev
```

---

## Expected Output:

You should now see:

```
✅ Connected to MongoDB
Database: findly
✅ MongoDB connection: active
Upload directory set to: ...
Serving static files from: ...
Frontend build detected at ...
Server running on port 5001
Backend URL: http://localhost:5001
```

---

## 🎯 Success!

You should see **"✅ Connected to MongoDB"** message!

---

## 🆘 If Port Still in Use:

Run this command to kill any process on port 5001:

```bash
netstat -ano | findstr :5001
```

Then:
```bash
taskkill /F /PID <PID_NUMBER>
```

Or use the `START_SERVER.bat` file I created - just double-click it!

---

**Your server should start successfully now! 🚀**


