@echo off
echo Killing process on port 5001...

REM Find and kill process on port 5001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001 ^| findstr LISTENING') do (
    echo Killing process %%a
PAUSE taskkill /F /PID %%a >nul 2>&1
)

echo Starting server...
cd backend
node server.js

pause


