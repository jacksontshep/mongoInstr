#!/usr/bin/env node

/**
 * Cross-platform build script for N|Solid MongoDB Demo
 * Works on Windows, macOS, and Linux
 */

const { spawn } = require('child_process')
const os = require('os')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function checkEnvironment() {
  const nsolidSaas = process.env.NSOLID_SAAS
  
  if (!nsolidSaas || nsolidSaas.trim() === '') {
    log('❌ Error: NSOLID_SAAS environment variable is not set or is empty.', colors.red)
    log('Please set it using one of these methods:', colors.yellow)
    
    const platform = os.platform()
    if (platform === 'win32') {
      log('  Windows CMD: set NSOLID_SAAS=your_token_here', colors.cyan)
      log('  Windows PowerShell: $env:NSOLID_SAAS = "your_token_here"', colors.cyan)
    } else {
      log('  Unix/Linux/Mac: export NSOLID_SAAS=your_token_here', colors.cyan)
    }
    
    process.exit(1)
  }
  
  return nsolidSaas
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    log(`Running: ${command} ${args.join(' ')}`, colors.cyan)
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    })
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })
    
    child.on('error', (error) => {
      reject(error)
    })
  })
}

async function buildAndRun() {
  try {
    log('🚀 N|Solid MongoDB Demo - Cross-Platform Build Script', colors.green)
    log(`Platform: ${os.platform()} ${os.arch()}`, colors.yellow)
    
    // Check environment
    const nsolidSaas = checkEnvironment()
    log(`✅ NSOLID_SAAS environment variable is set`, colors.green)
    
    // Build Docker image
    log('📦 Building Docker image...', colors.yellow)
    await runCommand('docker', [
      'build',
      '--build-arg',
      `NSOLID_SAAS=${nsolidSaas}`,
      '-t',
      'localdemo:latest',
      '.'
    ])
    
    // Start containers
    log('🐳 Starting containers with docker-compose...', colors.yellow)
    await runCommand('docker-compose', ['up', '-d'])
    
    // Success message
    log('', colors.reset)
    log('✅ Application started successfully!', colors.green)
    log('Access it at:', colors.yellow)
    log('  - Web Interface: http://localhost:3000', colors.cyan)
    log('  - API Documentation: http://localhost:3000/api', colors.cyan)
    log('  - Health Check: http://localhost:3000/api/health', colors.cyan)
    log('', colors.reset)
    log('Useful commands:', colors.yellow)
    log('  - View logs: docker-compose logs -f', colors.cyan)
    log('  - Stop containers: docker-compose down', colors.cyan)
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, colors.red)
    process.exit(1)
  }
}

// Run the build process
buildAndRun()
