import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  // Check if user's role is in the allowed roles list
  if (!allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.role === 'student') {
      return <Navigate to="/dashboard" />;
    } else if (currentUser.role === 'instructor') {
      return <Navigate to="/instructor/dashboard" />;
    } else {
      // Fallback for other roles or if role is undefined
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

export default RoleRoute;