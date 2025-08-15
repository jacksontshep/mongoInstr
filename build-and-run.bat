@echo off
REM Windows batch script for building and running the N|Solid MongoDB demo

REM Check if NSOLID_SAAS is set and not empty
if "%NSOLID_SAAS%"=="" (
    echo Error: NSOLID_SAAS environment variable is not set or is empty.
    echo Please set it using: set NSOLID_SAAS=your_token_here
    pause
    exit /b 1
)

REM Proceed to build the Docker image
echo Building Docker image with NSOLID_SAAS=%NSOLID_SAAS%...
docker build --build-arg NSOLID_SAAS="%NSOLID_SAAS%" -t mongodemo:latest .

REM Run the Docker containers using docker-compose
docker-compose up -d

echo.
echo Application started! Access it at:
echo - Web Interface: http://localhost:3000
echo - API Documentation: http://localhost:3000/api
echo - Health Check: http://localhost:3000/api/health
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
pause
