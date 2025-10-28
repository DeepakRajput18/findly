# 🚀 Run Findly Locally

## Run Backend (MongoDB)

Open a terminal and run:

```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
cd backend
npm install
node server.js
```

**Expected Output:**
```
✅ Connected to MongoDB
Database: findly
✅ MongoDB connection: active
Upload directory set to: ...
Serving static files from: ...
Server running on port 5001
Backend URL: http://localhost:5001
```

---

## Run Frontend (React App)

**Open a NEW terminal** and run:

```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Or Run Both Together

In the root directory:

```bash
cd "C:\Users\deepa\Desktop\findly\findly (2)\findly\findly"
npm run dev
```

This runs both backend and frontend concurrently.

---

## .env File

Make sure you have `.env` file in the `findly` directory with:

```env
MONGODB_URI=mongodb+srv://findly-user:Findly123@cluster0.hbjeybx.mongodb.net/findly?retryWrites Anger&w=majority
JWT_SECRET=findly_secret_key_change_in_production_12345
PORT=5001
NODE_ENV=development
```

---

## Access Your App

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health

---

## 🎯 To See "✅ MongoDB Connected" Message

Just run the backend server:

```bash
cd backend
node server.js
```

You'll see the MongoDB connection status! 🚀

