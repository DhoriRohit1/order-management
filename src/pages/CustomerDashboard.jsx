import React, { useEffect, useState } from 'react';
import OrderHistory from '../components/OrderHistory'; 

const CustomerDashboard = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setCart(savedCart);
    setOrders(savedOrders);
  }, []);

  return (
    <div className=" p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">Customer Dashboard</h2>

      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <h3 className="text-2xl font-semibold mb-2">Your Cart</h3>
        {cart.length > 0 ? (
          <ul className="list-disc pl-5">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Order History Section */}
      <OrderHistory />
    </div>
  );
};

export default CustomerDashboard;
