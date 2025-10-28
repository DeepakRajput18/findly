# ❌ Fix MongoDB Authentication Error

## Error: "bad auth: authentication failed"

**Current password in .env:** `Findly123`

This password might be **WRONG**.

---

## 🔍 Check Your Real Password:

### Option 1: Reset Password in MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Click **"Database Access"** (left sidebar)
3. Find user: **"findly-user"**
4. Click **"Edit"**
5. Change password to something simple like: **"Findly123"**
6. Click **"Update User"**

Then update `.env` file:

```env
MONGODB_URI=mongodb+srv://findly-user:Findly123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

---

### Option 2: Use Your Actual Password

If you know your actual password:

1. Open: `backend/.env`
2. Replace `Findly123` with your actual password
3. If password has special characters, encode them at https://www.urlencoder.org/

---

## 🚀 After Updating:

**Stop your server (Ctrl+C) and restart:**

```powershell
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly\backend"
node server.js
```

---

## ✅ Success:

You should see:
```
✅ Connected to MongoDB
Database: findly
✅ MongoDB connection: active
```

---

**The authentication error means the password is incorrect. Update it with your real MongoDB Atlas password!**

