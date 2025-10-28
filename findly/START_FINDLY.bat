@echo off
title Findly Development Server
echo ========================================
echo    FINDLY DEVELOPMENT SERVER
echo ========================================
echo.

echo [1/4] Killing all processes on ports 5001, 5173, 5174, 5175...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001 ^| findstr LISTENING') do (
    echo   Killing process %%a on port 5001
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do (
    echo   Killing process %%a on port 5173
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5174 ^| findstr LISTENING') do (
    echo   Killing process %%a on port 5174
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5175 ^| findstr LISTENING') do (
    echo   Killing process %%a on port 5175
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo [2/4] Checking MongoDB connection...
cd backend
node -e "
const mongoose = require('mongoose');
const uri = 'mongodb+srv://findly-user:Findly123@cluster0.hbjeybx.mongodb.net/findly?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB connection test: SUCCESS');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ MongoDB connection test: FAILED');
    console.log('Error:', err.message);
    console.log('');
    console.log('SOLUTION:');
    console.log('1. Go to https://cloud.mongodb.com');
    console.log('2. Database Access → findly-user → Edit');
    console.log('3. Reset password to: Findly123');
    console.log('4. Save changes');
    process.exit(1);
  });
"

if %errorlevel% neq 0 (
    echo.
    echo ❌ MongoDB connection failed. Please fix the password first.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/4] Starting backend server...
start "Findly Backend" cmd /k "cd backend && node server.js"

echo.
echo [4/4] Starting frontend server...
cd ..
start "Findly Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo    FINDLY IS STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:5001
echo Frontend: http://localhost:5173 (or 5174/5175)
echo Health:   http://localhost:5001/health
echo.
echo Press any key to open the app in browser...
pause >nul

start http://localhost:5173
start http://localhost:5001/health

echo.
echo ✅ Findly is running! Check the opened windows.
echo.
pause
