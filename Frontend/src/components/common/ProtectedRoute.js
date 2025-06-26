import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser, isAuthenticated, hasRole } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  // If a specific role is required, check if the user has that role
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" />;
  }
  
  // If authenticated and has the required role (if specified), render the protected component
  return children;
}

export default ProtectedRoute;