CREATE TABLE stock_levels (
    stock_id SERIAL PRIMARY KEY,
    product_id INT, -- Foreign key referencing products table
    warehouse_id INT, -- Foreign key referencing warehouses table
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses (warehouse_id) ON DELETE CASCADE
);
