// -- Otel Instrumentation provides spans for worker management--
const nsolid = require('nsolid')
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb')
const api = require('@opentelemetry/api')

// Register the OpenTelemetry api with nsolid
if (!nsolid.otel.register(api)) {
  throw new Error('Failed to register NSOLID OpenTelemetry')
}

// Register the desired instrumentation with the N|Solid native implementation
nsolid.otel.registerInstrumentations([
  new MongoDBInstrumentation()
])

const express = require('express')
const cors = require('cors')
const path = require('path')
const database = require('./database')
const productsRouter = require('./routes/products')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/products', productsRouter)

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isDbConnected = await database.testConnection()
    res.json({
      success: true,
      message: 'Server is running',
      database: isDbConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message
    })
  }
})

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'MongoDB Demo API',
    version: '1.0.0',
    endpoints: {
      'GET /api/health': 'Health check',
      'GET /api/products': 'Get all products',
      'GET /api/products/:id': 'Get product by ID',
      'POST /api/products': 'Create new product',
      'PUT /api/products/:id': 'Update product',
      'DELETE /api/products/:id': 'Delete product'
    },
    sampleProduct: {
      name: 'Sample Product',
      price: 29.99,
      category: 'Electronics',
      inStock: true
    }
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// Start server
async function startServer () {
  try {
    // Connect to database
    await database.connect()

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`API documentation: http://localhost:${PORT}/api`)
      console.log(`Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...')
  await database.disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...')
  await database.disconnect()
  process.exit(0)
})

startServer()
