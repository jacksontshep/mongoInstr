# PowerShell script for building and running the N|Solid MongoDB demo
# Compatible with Windows PowerShell and PowerShell Core (cross-platform)

param(
    [string]$NsolidSaas = $env:NSOLID_SAAS
)

# Check if NSOLID_SAAS is set
if ([string]::IsNullOrEmpty($NsolidSaas)) {
    Write-Host "Error: NSOLID_SAAS environment variable is not set or is empty." -ForegroundColor Red
    Write-Host "Please set it using one of these methods:" -ForegroundColor Yellow
    Write-Host "  Method 1: `$env:NSOLID_SAAS = 'your_token_here'" -ForegroundColor Cyan
    Write-Host "  Method 2: .\build-and-run.ps1 -NsolidSaas 'your_token_here'" -ForegroundColor Cyan
    exit 1
}

try {
    # Proceed to build the Docker image
    Write-Host "Building Docker image with NSOLID_SAAS=$NsolidSaas..." -ForegroundColor Green
    docker build --build-arg NSOLID_SAAS="$NsolidSaas" -t localdemo:latest .
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker build failed"
    }

    # Run the Docker containers using docker-compose
    Write-Host "Starting containers..." -ForegroundColor Green
    docker-compose up -d
    
    if ($LASTEXITCODE -ne 0) {
        throw "Docker compose failed"
    }

    Write-Host ""
    Write-Host "✅ Application started successfully!" -ForegroundColor Green
    Write-Host "Access it at:" -ForegroundColor Yellow
    Write-Host "  - Web Interface: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "  - API Documentation: http://localhost:3000/api" -ForegroundColor Cyan
    Write-Host "  - Health Check: http://localhost:3000/api/health" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Useful commands:" -ForegroundColor Yellow
    Write-Host "  - View logs: docker-compose logs -f" -ForegroundColor Cyan
    Write-Host "  - Stop containers: docker-compose down" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
}
