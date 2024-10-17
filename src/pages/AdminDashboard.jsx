import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  const lowStockProducts = products.filter((product) => product.stock < 5);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <h3 className="text-2xl font-semibold mb-2">Low Stock Products</h3>
      {lowStockProducts.length > 0 ? (
        <ul className="list-disc pl-5">
          {lowStockProducts.map((product) => (
            <li key={product.id} className="flex justify-between items-center border-b py-2">
              <span className="text-lg">{product.name}</span>
              <span className="text-lg text-red-500">{product.stock} left</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No products need restocking.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
