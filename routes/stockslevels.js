const express = require('express');
const router = express.Router();
const knex = require('../db');

// Get all stock levels
router.get('/', async (req, res) => {
  try {
    const stockLevels = await knex('stock_levels')
      .join('products', 'stock_levels.product_id', '=', 'products.product_id')
      .join('warehouses', 'stock_levels.warehouse_id', '=', 'warehouses.warehouse_id')
      .select('stock_levels.stock_id', 'products.product_name', 'warehouses.warehouse_name', 'stock_levels.quantity');
    res.json(stockLevels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stock levels by warehouse ID
router.get('/warehouse/:warehouse_id', async (req, res) => {
  const { warehouse_id } = req.params;
  try {
    const stockLevels = await knex('stock_levels')
      .where({ warehouse_id })
      .join('products', 'stock_levels.product_id', '=', 'products.product_id')
      .select('stock_levels.stock_id', 'products.product_name', 'stock_levels.quantity');
    res.json(stockLevels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update stock level
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedStock = await knex('stock_levels')
      .where({ stock_id: id })
      .update({ quantity, last_updated: knex.fn.now() })
      .returning('*');
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete stock level
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await knex('stock_levels').where({ stock_id: id }).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
