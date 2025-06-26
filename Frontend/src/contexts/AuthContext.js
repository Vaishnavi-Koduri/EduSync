import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Get stored user from localStorage on initial load
  const storedUser = localStorage.getItem('eduSyncUser');
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Base API URL - should match your backend
  const API_URL = 'https://localhost:7046/api/Auth';

  // Effect to handle user persistence
  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem('eduSyncUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (name, email, password, role) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Registration failed');
      }

      return { success: true, message: 'Registration successful' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed');
      }

      const userData = await response.json();
      
      // Store user data in state and localStorage
      const user = {
        jwt: userData.jwt,
        role: userData.role,
        email: userData.email,
        name: userData.name
      };
      
      setCurrentUser(user);
      localStorage.setItem('eduSyncUser', JSON.stringify(user));
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eduSyncUser');
  };

  // Check if the current user is authenticated
  const isAuthenticated = () => {
    return !!currentUser?.jwt;
  };

  // Check if the current user has a specific role
  const hasRole = (role) => {
    return currentUser?.role === role;
  };

  // Get the authentication token for API requests
  const getAuthHeader = () => {
    return currentUser?.jwt ? { Authorization: `Bearer ${currentUser.jwt}` } : {};
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
    error,
    isAuthenticated,
    hasRole,
    getAuthHeader
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;