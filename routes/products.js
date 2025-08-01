const express = require('express')
const { ObjectId } = require('mongodb')
const database = require('../database')

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const db = database.getDb()
    const products = await db.collection('products').find({}).toArray()
    res.json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    })
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const db = database.getDb()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      })
    }

    const product = await db.collection('products').findOne({ _id: new ObjectId(id) })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    })
  }
})

// Create new product
router.post('/', async (req, res) => {
  try {
    const db = database.getDb()
    const { name, price, category, inStock } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      })
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      inStock: inStock !== undefined ? inStock : true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('products').insertOne(newProduct)

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        _id: result.insertedId,
        ...newProduct
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    })
  }
})

// Update product
router.put('/:id', async (req, res) => {
  try {
    const db = database.getDb()
    const { id } = req.params
    const { name, price, category, inStock } = req.body

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      })
    }

    const updateData = {
      updatedAt: new Date()
    }

    if (name) updateData.name = name
    if (price) updateData.price = parseFloat(price)
    if (category) updateData.category = category
    if (inStock !== undefined) updateData.inStock = inStock

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const db = database.getDb()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      })
    }

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    })
  }
})

module.exports = router
