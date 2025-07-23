/**
 * Utility functions for file operations
 * Note: These functions would typically be server-side operations
 * For this demo, we're simulating them in the browser
 */

/**
 * Updates the registrations.json file with a new registration
 * In a real application, this would be a server-side operation
 * 
 * @param {Object} registrationData - The registration data to add
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
export const updateRegistrationsJsonFile = async (registrationData) => {
  try {
    // In a real application, this would be a server-side API call
    // For this demo, we'll simulate it by storing in localStorage
    
    // Get current registrations from localStorage
    const currentRegistrationsJson = localStorage.getItem('registrationsJson');
    let registrations = { registrations: [] };
    
    if (currentRegistrationsJson) {
      registrations = JSON.parse(currentRegistrationsJson);
    }
    
    // Add new registration
    registrations.registrations.push(registrationData);
    
    // Save back to localStorage
    localStorage.setItem('registrationsJson', JSON.stringify(registrations));
    
    console.log('Registration added to registrations.json:', registrationData);
    
    return true;
  } catch (error) {
    console.error('Error updating registrations.json file:', error);
    return false;
  }
};

/**
 * Gets the contents of the registrations.json file
 * In a real application, this would be a server-side operation
 * 
 * @returns {Promise<Object>} - The registrations data
 */
export const getRegistrationsJsonFile = async () => {
  try {
    // In a real application, this would be a server-side API call
    // For this demo, we'll simulate it by retrieving from localStorage
    
    const registrationsJson = localStorage.getItem('registrationsJson');
    
    if (registrationsJson) {
      return JSON.parse(registrationsJson);
    }
    
    // If no data in localStorage, initialize with the default registration from registrations.json
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
    
    // Save the default registration to localStorage
    localStorage.setItem('registrationsJson', JSON.stringify(defaultRegistration));
    
    return defaultRegistration;
  } catch (error) {
    console.error('Error getting registrations.json file:', error);
    return { registrations: [] };
  }
};