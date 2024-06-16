const express = require('express');
const router = express.Router();
const knex = require('../db');

// Get all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await knex.select().table('warehouses');
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new warehouse
router.post('/', async (req, res) => {
  try {
    const { warehouse_name, location } = req.body;
    const newWarehouse = await knex('warehouses').insert({
      warehouse_name,
      location
    }).returning('*');
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a warehouse
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { warehouse_name, location } = req.body;
    const updatedWarehouse = await knex('warehouses')
      .where({ warehouse_id: id })
      .update({ warehouse_name, location })
      .returning('*');
    res.json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a warehouse
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await knex('warehouses').where({ warehouse_id: id }).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
