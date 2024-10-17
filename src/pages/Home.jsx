import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Shopping Portal</h1>
        <p className="text-lg text-gray-600 mb-6">Please log in or register to continue.</p>
        <div className="space-x-4">
          <Link to="/register" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Register
          </Link>
          <Link to="/" className="inline-block px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
