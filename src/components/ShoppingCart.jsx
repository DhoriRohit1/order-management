import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = getFromLocalStorage('cart') || [];
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveToLocalStorage('cart', updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    saveToLocalStorage('cart', []);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const existingOrders = getFromLocalStorage('orderHistory') || [];
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalPrice: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
    };
    existingOrders.push(newOrder);
    saveToLocalStorage('orderHistory', existingOrders);
    clearCart();
    alert('Thank you for your purchase! Your order has been placed successfully.');
  };

  return (
    <div className="p-6 rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Shopping Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="p-4 bg-white border border-gray-300 rounded-md shadow">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-md mb-2" 
                style={{ objectFit: 'contain' }} // Prevents cropping
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">Price: ${item.price}</p>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
                style={{width:"100px"}}
              >
                
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-white">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={clearCart}
            className="mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
            style={{ width: "150px" }}
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="mt-2 ml-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            style={{ width: "150px" }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
