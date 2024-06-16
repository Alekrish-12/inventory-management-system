const express = require('express');
const router = express.Router();
const knex = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await knex.select().table('products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await knex('products').where({ product_id: id }).first();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const { product_name, description, price, supplier_id } = req.body;
    const newProduct = await knex('products').insert({
      product_name,
      description,
      price,
      supplier_id
    }).returning('*');
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, description, price, supplier_id } = req.body;
    const updatedProduct = await knex('products')
      .where({ product_id: id })
      .update({ product_name, description, price, supplier_id })
      .returning('*');
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await knex('products').where({ product_id: id }).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
