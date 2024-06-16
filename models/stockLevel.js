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

// Add or update stock level
router.post('/', async (req, res) => {
  try {
    const { product_id, warehouse_id, quantity } = req.body;
    // Check if stock entry exists
    const existingStock = await knex('stock_levels')
      .where({ product_id, warehouse_id })
      .first();

    if (existingStock) {
      // Update existing stock level
      await knex('stock_levels')
        .where({ product_id, warehouse_id })
        .update({ quantity, last_updated: knex.fn.now() });
    } else {
      // Insert new stock entry
      await knex('stock_levels').insert({
        product_id,
        warehouse_id,
        quantity,
        last_updated: knex.fn.now()
      });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete stock level entry
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
