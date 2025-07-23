/**
 * Utility functions for authentication and user management
 */
import { addRegistration } from '../services/api';

/**
 * Updates the registrations.json file with new user data
 * In a real application, this would be an API call to the server
 * 
 * @param {Object} userData - The user data to add to registrations
 */
export const updateRegistrationsFile = async (userData) => {
  try {
    // Create registration data in the format expected by registrations.json
    const registrationData = {
      id: Date.now(), // Generate a unique ID based on timestamp
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phone,
      password: userData.password, // In a real app, this should be hashed
      registrationDate: new Date().toISOString(),
      status: "Active",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      }
    };
    
    // Use the API service to add the registration
    const result = await addRegistration(registrationData);
    
    // Also update the localStorage registrationsJson to ensure consistency
    try {
      const registrationsJson = localStorage.getItem('registrationsJson');
      let registrations = { registrations: [] };
      
      if (registrationsJson) {
        registrations = JSON.parse(registrationsJson);
      }
      
      registrations.registrations.push(registrationData);
      localStorage.setItem('registrationsJson', JSON.stringify(registrations));
    } catch (localStorageError) {
      console.error('Error updating localStorage registrationsJson:', localStorageError);
    }
    
    if (result.success) {
      console.log('Registration successfully added to registrations.json');
      return true;
    } else {
      console.error('Failed to add registration:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error updating registrations file:', error);
    return false;
  }
};

/**
 * Validates user credentials against stored data
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object|null} - User data if valid, null if invalid
 */
export const validateCredentials = (email, password) => {
  try {
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Find user with matching email
    const user = registeredUsers.find(user => user.email === email);
    
    // If no user found or password doesn't match, return null
    if (!user || user.password !== password) {
      return null;
    }
    
    // Return user data without password
    const { password: _, ...userData } = user;
    return userData;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
};

/**
 * Checks if a user is authenticated
 * 
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isUserAuthenticated = () => {
  return localStorage.getItem('userData') !== null;
};

/**
 * Gets the current user data
 * 
 * @returns {Object|null} - User data if authenticated, null otherwise
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};