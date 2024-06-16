import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.product_id !== id));
      })
      .catch(error => {
        console.error('Error deleting product: ', error);
      });
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            <div>{product.product_name}</div>
            <div>{product.description}</div>
            <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
