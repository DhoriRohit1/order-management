import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import ProductForm from './components/ProductForm';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import OrderHistory from './components/OrderHistory';
import Header from './components/Header';
import { UserProvider } from './components/UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <div>
<UserProvider>
        <Header user={user} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Public Routes */}
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/order-history" element={<OrderHistory />} />

        {/* Private Routes */}
        <Route
          path="/customer-dashboard"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Only Admins can access the Product Form */}
        <Route
          path="/product-form"
          element={
           
              <ProductForm />
       
          }
        />
      </Routes>
</UserProvider>
    </div>
  );
};

export default App;
