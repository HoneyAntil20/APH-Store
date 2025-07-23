// Validation utility functions for form inputs

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { isValid: false, message: 'Phone number must be exactly 10 digits' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, message: string, requirements: object }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { 
      isValid: false, 
      message: 'Password is required',
      requirements: {
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
      }
    };
  }
  
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password)
  };
  
  const isValid = Object.values(requirements).every(req => req);
  
  let message = '';
  if (!isValid) {
    message = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)';
  }
  
  return { isValid, message, requirements };
};

/**
 * Validates password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Formats phone number input
 * @param {string} value - Raw phone input
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  if (cleanValue.length <= 10) {
    // Format as (XXX) XXX-XXXX
    if (cleanValue.length >= 6) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6)}`;
    } else if (cleanValue.length >= 3) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
    } else {
      return cleanValue;
    }
  }
  
  // Return original value if more than 10 digits (don't format)
  return value;
};

/**
 * Gets clean phone number (digits only)
 * @param {string} formattedPhone - Formatted phone number
 * @returns {string} - Clean phone number with digits only
 */
export const getCleanPhoneNumber = (formattedPhone) => {
  return formattedPhone.replace(/\D/g, '');
};

/**
 * Comprehensive form validation
 * @param {object} formData - Form data object
 * @param {array} requiredFields - Array of required field names
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  
  // Validate required fields
  requiredFields.forEach(field => {
    const validation = validateRequired(formData[field], field);
    if (!validation.isValid) {
      errors[field] = validation.message;
    }
  });
  
  // Validate email if present
  if (formData.email !== undefined) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message;
    }
  }
  
  // Validate phone if present
  if (formData.phone !== undefined) {
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.message;
    }
  }
  
  // Validate password if present
  if (formData.password !== undefined) {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }
  
  // Validate password confirmation if present
  if (formData.confirmPassword !== undefined && formData.password !== undefined) {
    const confirmValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
    if (!confirmValidation.isValid) {
      errors.confirmPassword = confirmValidation.message;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};