# 🔐 Check Your MongoDB Password

## Current Password in .env: `Findly123`

The error "bad auth: authentication failed" means the password is WRONG.

---

## ✅ Solution: Verify Your Actual MongoDB Atlas Password

### Step 1: Go to MongoDB Atlas
👉 https://cloud.mongodb.com

### Step 2: Check Your Database User
1. Click **"Database Access"** (left sidebar under SECURITY)
2. Find user: **"findly-user"**
3. Click the **"Edit"** or **"..."** button
4. See if you can reset the password OR check what the current password is

---

## 🔑 Common Scenarios:

### Scenario 1: Password is Actually Different
If your password is NOT `Findly123`, update `.env`:

```env
MONGODB_URI=mongodb+srv://findly-user:YOUR_ACTUAL_PASSWORD@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority
```

### Scenario 2: Special Characters in Password
If password has special characters like `@`, `#`, `!`:

1. Go to: https://www.urlencoder.org/
2. Enter your password
3. Copy the encoded version
4. Use encoded version in connection string

Example: `Password@123` → `Password%40123`

---

## 📝 Quick Fix Commands:

### Update .env with Your Actual Password:

```powershell
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly\backend"
```

Then edit `.env` file and replace `Findly123` with your actual password.

---

## 🎯 After Updating Password:

**Restart your server:**
1. Press `Ctrl+C` to stop the server
2. Run again: `node server.js`
3. You should see: **"✅ Connected to MongoDB"**

---

**The password `Findly123` might not be correct. Check your MongoDB Atlas to get the real password!**


