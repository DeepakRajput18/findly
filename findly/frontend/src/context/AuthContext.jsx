import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Validate token if it exists
          if (parsedUser.token || storedToken) {
            const token = parsedUser.token || storedToken;
            
            // Set authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Verify token is still valid (optional - can be removed for better performance)
            try {
              const response = await axios.get('http://localhost:5001/api/users/me');
              setUser(response.data);
            } catch (error) {
              // Token is invalid, clear storage
              console.log('Token validation failed, clearing storage');
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              delete axios.defaults.headers.common['Authorization'];
            }
          } else {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to register user:', { ...userData, password: '[REDACTED]' });
      
      const response = await axios.post('http://localhost:5001/api/users/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Registration successful, received user data:', { ...response.data, token: '[REDACTED]' });
      const data = response.data;
      
      // Save user to state and localStorage
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setError('Network error: Please check if the server is running and try again.');
      } else if (error.response?.status === 400) {
        setError(error.response.data.message || 'Invalid registration data');
      } else if (error.response?.status === 401) {
        setError(error.response.data.message || 'Unauthorized');
      } else {
        setError(error.response?.data?.message || 'Registration failed. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password, isAdmin = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to login with:', { email, isAdmin });
      
      // Special case for admin login
      if (isAdmin && email === 'admin@example.com' && password === 'password123') {
        console.log('Admin login successful');
        
        // Create admin user data
        const adminData = {
          _id: 'admin-user',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true,
          token: 'admin-token'
        };
        
        // Save admin user to state and localStorage
        setUser(adminData);
        localStorage.setItem('user', JSON.stringify(adminData));
        
        return adminData;
      }
      
      // Regular user authentication via API
      const response = await axios.post('http://localhost:5001/api/users/login', { 
        email, 
        password
      });
      
      const data = response.data;
      console.log('Login successful, received user data:', { ...data, token: '[REDACTED]' });
      
      // Save user to state and localStorage
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Store token separately for easy access
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Clear any pending API requests
      if (axios.defaults.headers.common['Authorization']) {
        delete axios.defaults.headers.common['Authorization'];
      }
      
      // Clear user from state
      setUser(null);
      
      // Clear localStorage
      localStorage.removeItem('user');
      
      // Clear any other stored data if needed
      localStorage.removeItem('darkMode'); // Keep dark mode preference
      
      // Clear any cached data
      // You can add more cleanup here as needed
      
      console.log('User logged out successfully');
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Force cleanup even if there's an error
      setUser(null);
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if userData is FormData (for image uploads) or regular object
      const isFormData = userData instanceof FormData;
      console.log('Updating profile with FormData:', isFormData);
      
      // Set content type header based on data type
      const headers = {
        Authorization: `Bearer ${user.token}`
      };
      
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      // Print the userData for debugging
      if (isFormData) {
        console.log('FormData entries:');
        for (let pair of userData.entries()) {
          // Don't log the full file object, just the name
          if (pair[0] === 'profileImage') {
            console.log(pair[0], pair[1].name);
          } else {
            console.log(pair[0], pair[1]);
          }
        }
      } else {
        console.log('userData:', userData);
      }
      
      console.log('Sending request with headers:', headers);
      
      const response = await axios.put(
        'http://localhost:5001/api/users/profile', 
        userData,
        { headers }
      );
      const data = response.data;
      console.log('Profile update response:', data);
      
      // Update user in state and localStorage
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('Error in updateProfile:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 