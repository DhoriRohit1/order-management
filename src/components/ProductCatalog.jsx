import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const ProductCatalog = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = getFromLocalStorage('products') || [];
    setProducts(storedProducts);
  }, []);

  const addToCart = (product) => {
    const cartItems = getFromLocalStorage('cart') || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If item already exists, increase the quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveToLocalStorage('cart', updatedCart);
    } else {
      // Add new item to the cart with quantity 1
      const newItem = { ...product, quantity: 1 };
      cartItems.push(newItem);
      saveToLocalStorage('cart', cartItems);
    }

    alert(`${product.name} added to cart successfully!`);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-4 flex flex-col">
              <img
                src={product.image} // Assuming 'product.image' contains the image URL
                alt={product.name}
                className="w-full h-48 object-contain rounded-md mb-2" // Use object-contain to prevent cropping
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-200">Price: ${product.price}</p>
              <p className="text-gray-200">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-white text-indigo-600 py-2 rounded-md hover:bg-gray-100 transition duration-200"
                style={{ width: "150px" }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
