// Example fetch API usage to get products
fetch('/products')
  .then(response => response.json())
  .then(products => {
    // Display products on the webpage
    console.log(products);
  })
  .catch(error => console.error('Error fetching products:', error));
