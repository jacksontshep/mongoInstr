# MongoDB Demo App

A simple Node.js application with dockerized MongoDB, perfect for client demonstrations. This application provides a complete CRUD API for managing products with a beautiful web interface.

## 🚀 Features

- **RESTful API** with full CRUD operations
- **Dockerized MongoDB** for easy setup and portability
- **Modern Web Interface** for interactive demonstrations
- **Health Check Endpoints** for monitoring
- **Sample Data** pre-loaded for immediate demo
- **Error Handling** and validation
- **Graceful Shutdown** handling

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🛠️ Quick Start

### Option 1: Full Docker Setup (Recommended)

```bash
# Navigate to project directory
cd mongoInstr

# Start both MongoDB and Node.js app in containers
npm run docker:up-build

# Or manually with docker-compose
docker-compose up -d --build
```

This will:
- Build and start the Node.js application container
- Start MongoDB container with sample data
- Set up networking between containers
- Expose the app on port 3000

### Option 2: Local Development Setup

```bash
# Navigate to project directory
cd mongoInstr

# Install dependencies
npm install

# Start only MongoDB with Docker
npm run docker:mongo-only

# Start the Node.js application locally
npm start
```

The application will be available at:
- **Web Interface**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 📚 API Endpoints

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | System health check |
| GET | `/api` | API documentation |

### Sample Product Object

```json
{
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics",
  "inStock": true
}
```

## 🎯 Demo Scenarios

### Scenario 1: Basic CRUD Operations
1. Open http://localhost:3000
2. View existing products
3. Add a new product using the form
4. Delete a product
5. Check system health

### Scenario 2: API Testing with curl

```bash
# Get all products
curl http://localhost:3000/api/products

# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":49.99,"category":"Demo","inStock":true}'

# Health check
curl http://localhost:3000/api/health
```

### Scenario 3: Database Connection Demo
1. Stop MongoDB: `npm run docker:down`
2. Try to access the app - see error handling
3. Restart MongoDB: `npm run docker:up`
4. Refresh the app - see automatic reconnection

## 🐳 Docker Commands

### Full Application (MongoDB + Node.js)

```bash
# Build and start both services
npm run docker:up-build
# or
docker-compose up -d --build

# Start services (without rebuilding)
npm run docker:up
# or
docker-compose up -d

# Stop all services
npm run docker:down
# or
docker-compose down

# View logs for all services
npm run docker:logs
# or
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app
docker-compose logs -f mongodb
```

### MongoDB Only (for local development)

```bash
# Start only MongoDB
npm run docker:mongo-only
# or
docker-compose up -d mongodb

# Access MongoDB shell
docker exec -it mongo-demo mongosh -u demo_user -p demo_password --authenticationDatabase demo_db
```

### Build Commands

```bash
# Build the Node.js application image
npm run docker:build
# or
docker-compose build

# Rebuild and restart services
docker-compose up -d --build
```

## 📁 Project Structure

```
mongoInstr/
├── public/
│   └── index.html          # Web interface
├── routes/
│   └── products.js         # Product API routes
├── .env                    # Environment variables
├── database.js             # MongoDB connection logic
├── docker-compose.yml      # Docker configuration
├── init-mongo.js          # MongoDB initialization script
├── package.json           # Node.js dependencies
├── server.js              # Main application server
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables (.env)

```env
MONGODB_URI=mongodb://demo_user:demo_password@localhost:27017/demo_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=demo_db
MONGODB_USERNAME=demo_user
MONGODB_PASSWORD=demo_password
PORT=3000
NODE_ENV=development
```

### MongoDB Configuration

- **Database**: `demo_db`
- **Collection**: `products`
- **Username**: `demo_user`
- **Password**: `demo_password`
- **Port**: `27017`

## 🚨 Troubleshooting

### MongoDB Connection Issues

1. **Check if Docker is running**:
   ```bash
   docker ps
   ```

2. **Check MongoDB container status**:
   ```bash
   docker-compose ps
   ```

3. **View MongoDB logs**:
   ```bash
   docker-compose logs mongodb
   ```

4. **Restart MongoDB**:
   ```bash
   npm run docker:down
   npm run docker:up
   ```

### Application Issues

1. **Check if port 3000 is available**:
   ```bash
   netstat -an | findstr :3000
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Check environment variables**:
   - Ensure `.env` file exists
   - Verify MongoDB connection string

## 🎨 Customization

### Adding New Fields to Products

1. Update the product schema in `routes/products.js`
2. Modify the web interface in `public/index.html`
3. Update the initialization script in `init-mongo.js`

### Changing the Database

1. Update `docker-compose.yml` for different MongoDB settings
2. Modify `.env` file with new connection details
3. Update `init-mongo.js` for different sample data

## 📝 License

This project is licensed under the MIT License - see the package.json file for details.

## 🤝 Contributing

This is a demo application. Feel free to fork and modify for your own demonstrations!

---

**Perfect for client demos showcasing:**
- Modern web development practices
- Docker containerization
- RESTful API design
- MongoDB integration
- Error handling and validation
- Responsive web interfaces
