import React, { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = getFromLocalStorage('orderHistory') || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Order History</h2>
      <ul className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id} className="p-4 bg-white border border-gray-300 rounded-md shadow">
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <p className="text-gray-700">Total Price: ${order.totalPrice}</p>
              <p className="text-gray-700">Order Date: {order.date}</p>
              <h4 className="font-semibold">Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-600">{item.name} (x{item.quantity}) - ${item.price}</li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No orders found</p>
        )}
      </ul>
    </div>
  );
};

export default OrderHistory;
