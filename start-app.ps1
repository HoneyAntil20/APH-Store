Write-Host "🚀 Starting APH Store Application..." -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "📡 Starting Backend API on port 5001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; Write-Host '🔧 Backend Starting...' -ForegroundColor Cyan; npm start"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "⚛️  Starting React Frontend on port 3001..." -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Both services will be available shortly:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5001" -ForegroundColor Cyan
Write-Host ""

npm start