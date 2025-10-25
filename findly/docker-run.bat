@echo off
echo 🚀 Setting up Findly with Docker...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker-compose down

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check service status
echo 📊 Checking service status...
docker-compose ps

REM Test health endpoints
echo 🏥 Testing health endpoints...
curl -f http://localhost/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Health check failed
) else (
    echo ✅ Health check passed
)

echo.
echo ✅ Setup complete!
echo 🌐 Application is available at: http://localhost
echo 📱 API is available at: http://localhost/api
echo.
echo 📋 Useful commands:
echo   View logs: docker-compose logs -f
echo   Stop services: docker-compose down
echo   Restart services: docker-compose restart
echo.
pause
