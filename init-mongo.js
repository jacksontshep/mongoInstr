// MongoDB initialization script
db = db.getSiblingDB('demo_db')

// Create a user for the demo database
db.createUser({
  user: 'demo_user',
  pwd: 'demo_password',
  roles: [
    {
      role: 'readWrite',
      db: 'demo_db'
    }
  ]
})

// Insert sample data
db.products.insertMany([
  {
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date()
  },
  {
    name: 'Coffee Mug',
    price: 12.99,
    category: 'Kitchen',
    inStock: true,
    createdAt: new Date()
  },
  {
    name: 'Desk Chair',
    price: 199.99,
    category: 'Furniture',
    inStock: false,
    createdAt: new Date()
  }
])

print('Database initialized with sample data')
