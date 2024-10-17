// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Adjust the path as needed

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/" />} // Redirect to login if not authenticated
    />
  );
};

export default ProtectedRoute;
