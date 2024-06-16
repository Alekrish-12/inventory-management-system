const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products');
const suppliersRouter = require('./routes/suppliers');
const warehousesRouter = require('./routes/warehouses');
const stockLevelsRouter = require('./routes/stockLevels');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/warehouses', warehousesRouter);
app.use('/stock_levels', stockLevelsRouter);

mongoose.connect('mongodb://localhost:27017/inventory-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

