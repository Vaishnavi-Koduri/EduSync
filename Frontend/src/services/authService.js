// Services for authentication

// Storage keys
const TOKEN_KEY = 'edusync_token';
const USER_KEY = 'edusync_user';

// Mock API response delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const authService = {
  // Login user
  login: async (email, password) => {
    try {
      // Simulating API call
      await delay(800);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      let userData = null;
      let token = 'sample-jwt-token'; // Replace with real token when backend connected

      if (email === 'student@example.com' && password === 'password') {
        userData = {
          id: '1',
          name: 'John Student',
          email: 'student@example.com',
          role: 'student',
          notifications: 3
        };
      } else if (email === 'instructor@example.com' && password === 'password') {
        userData = {
          id: '2',
          name: 'Jane Instructor',
          email: 'instructor@example.com',
          role: 'instructor',
          notifications: 2
        };
      } else {
        throw new Error('Invalid email or password');
      }

      // ✅ Store auth data in localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      await delay(1000);
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Name, email and password are required');
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const userString = localStorage.getItem(USER_KEY);
      if (!userString) return null;
      return JSON.parse(userString);
    } catch (error) {
      return null;
    }
  },

  // ✅ Get current auth token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

// Named exports
export const { login, register, logout } = authService;

// Default export with helper methods
export default authService;
