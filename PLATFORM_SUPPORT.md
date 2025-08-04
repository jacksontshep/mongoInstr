# Platform Support Guide

This N|Solid MongoDB Demo application supports **Windows**, **macOS**, and **Linux** platforms.

## 🖥️ Platform Requirements

### All Platforms
- **Docker** and **Docker Compose** installed
- **N|Solid SaaS token** (set as environment variable)
- **Git** (for cloning the repository)

### Platform-Specific Requirements

| Platform | Additional Requirements |
|----------|------------------------|
| **Windows** | PowerShell 5.1+ or PowerShell Core 6+ |
| **macOS** | Bash shell (default) |
| **Linux** | Bash shell (default) |

## 🚀 Quick Start by Platform

### Windows Users

#### Option 1: PowerShell (Recommended)
```powershell
# Set environment variable
$env:NSOLID_SAAS = "your_nsolid_saas_token_here"

# Run the application
npm run build:powershell
```

#### Option 2: Command Prompt
```cmd
# Set environment variable
set NSOLID_SAAS=your_nsolid_saas_token_here

# Run the application
npm run build:windows
```

#### Option 3: Cross-Platform Node.js Script
```powershell
# Set environment variable
$env:NSOLID_SAAS = "your_nsolid_saas_token_here"

# Run cross-platform script
npm run build:cross-platform
```

### macOS/Linux Users

#### Option 1: Bash Script
```bash
# Set environment variable
export NSOLID_SAAS="your_nsolid_saas_token_here"

# Run the application
npm run build:linux
```

#### Option 2: Cross-Platform Node.js Script
```bash
# Set environment variable
export NSOLID_SAAS="your_nsolid_saas_token_here"

# Run cross-platform script
npm run build:cross-platform
```

## 📋 Available Build Scripts

| Script | Platform | Description |
|--------|----------|-------------|
| `npm run build:linux` | Linux/macOS | Uses bash script (`build-and-run.sh`) |
| `npm run build:windows` | Windows | Uses batch script (`build-and-run.bat`) |
| `npm run build:powershell` | Windows | Uses PowerShell script (`build-and-run.ps1`) |
| `npm run build:cross-platform` | All | Uses Node.js script (works everywhere) |

## 🔧 Environment Variable Setup

### Windows
```powershell
# PowerShell (Persistent)
[Environment]::SetEnvironmentVariable("NSOLID_SAAS", "your_token_here", "User")

# PowerShell (Session)
$env:NSOLID_SAAS = "your_token_here"

# Command Prompt (Session)
set NSOLID_SAAS=your_token_here
```

### macOS/Linux
```bash
# Persistent (add to ~/.bashrc or ~/.zshrc)
echo 'export NSOLID_SAAS="your_token_here"' >> ~/.bashrc
source ~/.bashrc

# Session only
export NSOLID_SAAS="your_token_here"
```

## 🐳 Docker Requirements

### Docker Installation Links
- **Windows**: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- **macOS**: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) + [Docker Compose](https://docs.docker.com/compose/install/)

### Verify Docker Installation
```bash
# Check Docker
docker --version

# Check Docker Compose
docker-compose --version
```

## 🎯 N|Solid Platform Support

N|Solid supports the following platforms:

| Platform | Architecture | Support |
|----------|-------------|---------|
| **Windows** | x64 | ✅ Full Support |
| **macOS** | x64, ARM64 (M1/M2) | ✅ Full Support |
| **Linux** | x64, ARM64 | ✅ Full Support |

## 🔍 Troubleshooting

### Common Issues

#### Windows PowerShell Execution Policy
```powershell
# If you get execution policy errors
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Docker Permission Issues (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

#### Environment Variable Not Found
- **Windows**: Restart PowerShell/CMD after setting environment variables
- **macOS/Linux**: Run `source ~/.bashrc` or restart terminal

### Platform-Specific Notes

#### Windows
- Use PowerShell for best experience
- Docker Desktop must be running
- WSL2 backend recommended for Docker Desktop

#### macOS
- Docker Desktop must be running
- M1/M2 Macs: Use ARM64 compatible images (handled automatically)

#### Linux
- Ensure Docker daemon is running: `sudo systemctl start docker`
- Use `sudo` if not in docker group

## 📞 Support

If you encounter platform-specific issues:

1. **Check Docker installation** and ensure it's running
2. **Verify environment variables** are set correctly
3. **Try the cross-platform Node.js script** (`npm run build:cross-platform`)
4. **Check the logs** with `docker-compose logs -f`

## 🎉 Success Indicators

When everything works correctly, you should see:

```
✅ Application started successfully!
Access it at:
  - Web Interface: http://localhost:3000
  - API Documentation: http://localhost:3000/api
  - Health Check: http://localhost:3000/api/health
```

The application will be accessible on all platforms at the same URLs.
