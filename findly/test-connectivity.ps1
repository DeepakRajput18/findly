# Comprehensive Connectivity Test for Findly Services
Write-Host "🔍 Testing Findly Service Connectivity..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Frontend Service
Write-Host "1️⃣ Testing Frontend Service (Nginx)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend: SUCCESS (Status: $($response.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend: FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Frontend: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

# Test 2: Backend Health Check
Write-Host "2️⃣ Testing Backend Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        $healthData = $response.Content | ConvertFrom-Json
        Write-Host "✅ Backend Health: SUCCESS (DB: $($healthData.db), Status: $($healthData.status))" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend Health: FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Backend Health: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

# Test 3: API Endpoints
Write-Host "3️⃣ Testing API Endpoints" -ForegroundColor Yellow

$apiEndpoints = @(
    @{Name="Lost Items"; Url="http://localhost/api/lost-items"},
    @{Name="Found Items"; Url="http://localhost/api/found-items"},
    @{Name="Locations"; Url="http://localhost/api/locations/lost-items"}
)

foreach ($endpoint in $apiEndpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint.Url -UseBasicParsing -TimeoutSec 10
        Write-Host "✅ $($endpoint.Name): SUCCESS (Status: $($response.StatusCode))" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "✅ $($endpoint.Name): SUCCESS (Authentication required - normal)" -ForegroundColor Green
        } else {
            Write-Host "❌ $($endpoint.Name): FAILED ($($_.Exception.Message))" -ForegroundColor Red
        }
    }
}

# Test 4: MongoDB Connection (via Backend)
Write-Host "4️⃣ Testing MongoDB Connection" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing -TimeoutSec 10
    $healthData = $response.Content | ConvertFrom-Json
    if ($healthData.db -eq "connected") {
        Write-Host "✅ MongoDB: SUCCESS (Connected via Backend)" -ForegroundColor Green
    } else {
        Write-Host "❌ MongoDB: FAILED (Not connected)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ MongoDB: FAILED ($($_.Exception.Message))" -ForegroundColor Red
}

# Test 5: Container Status
Write-Host "5️⃣ Testing Container Status" -ForegroundColor Yellow
try {
    $containers = docker ps --filter "name=findly" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    Write-Host "📊 Container Status:" -ForegroundColor Cyan
    Write-Host $containers
} catch {
    Write-Host "❌ Container Status: FAILED to check" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Connectivity Test Complete!" -ForegroundColor Cyan
Write-Host "🌐 Application URL: http://localhost" -ForegroundColor Green
Write-Host "📱 API Base URL: http://localhost/api" -ForegroundColor Green
