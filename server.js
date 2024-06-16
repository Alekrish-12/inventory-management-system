const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRouter = require('./routes/products');
const suppliersRouter = require('./routes/suppliers');
const warehousesRouter = require('./routes/warehouses');
const stockLevelsRouter = require('./routes/stockLevels');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/warehouses', warehousesRouter);
app.use('/stockLevels', stockLevelsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
