const { MongoClient } = require('mongodb')
require('dotenv').config()

class Database {
  constructor () {
    this.client = null
    this.db = null
  }

  async connect () {
    try {
      const uri = process.env.MONGODB_URI
      console.log('Connecting to MongoDB...')

      this.client = new MongoClient(uri)
      await this.client.connect()

      this.db = this.client.db(process.env.MONGODB_DATABASE)
      console.log('Successfully connected to MongoDB')

      return this.db
    } catch (error) {
      console.error('MongoDB connection error:', error)
      throw error
    }
  }

  async disconnect () {
    try {
      if (this.client) {
        await this.client.close()
        console.log('Disconnected from MongoDB')
      }
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error)
    }
  }

  getDb () {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.db
  }

  async testConnection () {
    try {
      const db = this.getDb()
      await db.admin().ping()
      console.log('Database connection test successful')
      return true
    } catch (error) {
      console.error('Database connection test failed:', error)
      return false
    }
  }
}

module.exports = new Database()
