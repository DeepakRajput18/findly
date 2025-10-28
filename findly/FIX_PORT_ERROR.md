# 🔧 Fix Port 5001 Already in Use Error

## Quick Fix

**Problem:** Port 5001 is already in use

**Solution:** Kill the process and restart

---

## Step 1: Find Process Using Port 5001

```bash
netstat -ano | findstr :5001
```

You'll see a process ID (like 30752)

---

## Step 2: Kill the Process

```bash
taskkill /F /PID 30752
```

Replace `30752` with your actual process ID

---

## Step 3: Restart Your Server

```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
npm run dev
```

---

## Or Use This One-Liner:

```bash
netstat -ano | findstr :5001
taskkill /F /PID <PID_NUMBER>
```

---

## Expected Result:

After killing the process, nodemon will automatically restart and you should see:

```
✅ Connected to MongoDB
Database: findly
✅ MongoDB connection: active
Server running on port 5001
```

---

## 🎯 Alternative: Use Different Port

Edit `backend/.env`:
```
PORT=5002
```

Then restart the server.

