const express = require('express');
const router = express.Router();
const knex = require('../db');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await knex.select().table('suppliers');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await knex('suppliers').where({ supplier_id: id }).first();
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new supplier
router.post('/', async (req, res) => {
  try {
    const { supplier_name, contact_info } = req.body;
    const newSupplier = await knex('suppliers').insert({
      supplier_name,
      contact_info
    }).returning('*');
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_name, contact_info } = req.body;
    const updatedSupplier = await knex('suppliers')
      .where({ supplier_id: id })
      .update({ supplier_name, contact_info })
      .returning('*');
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await knex('suppliers').where({ supplier_id: id }).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
