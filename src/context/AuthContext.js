import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateRegistrationsFile, getCurrentUser } from '../utils/authUtils';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize registrations data and check if user is logged in on initial load
  useEffect(() => {
    // Initialize registrations data if not already present
    const registrationsJson = localStorage.getItem('registrationsJson');
    if (!registrationsJson) {
      // Default registration data
      const defaultRegistration = {
        registrations: [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "+1 (123) 456-7890",
            password: "hashedPassword123",
            registrationDate: "2023-06-15T10:30:45Z",
            status: "Active",
            address: {
              street: "",
              city: "",
              state: "",
              zipCode: "",
              country: ""
            }
          }
        ]
      };
      localStorage.setItem('registrationsJson', JSON.stringify(defaultRegistration));
    }
    
    // Check if user is logged in
    const userData = getCurrentUser();
    if (userData) {
      setCurrentUser(userData);
    }
    setLoading(false);
  }, []);

  // Login function with smooth transition
  const login = (userData) => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      localStorage.setItem('userData', JSON.stringify(userData));
      setCurrentUser(userData);
    }, 100);
    return true;
  };

  // Logout function with smooth transition
  const logout = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      localStorage.removeItem('userData');
      setCurrentUser(null);
    }, 100);
  };

  // Register function
  const register = (userData) => {
    // Get existing registrations
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Add new user to registered users
    registeredUsers.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Update the registrations.json file (simulated)
    updateRegistrationsFile(userData);
    
    // Update current user
    setCurrentUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    return true;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Context value
  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;