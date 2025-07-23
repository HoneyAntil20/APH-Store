// Validation middleware for user registration and authentication

/**
 * Validates user registration data
 */
const validateRegistration = (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  const errors = [];

  // Validate name
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Validate email
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }

  // Validate password
  if (!password) {
    errors.push('Password is required');
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
    }
  }

  // Validate phone number
  if (!phoneNumber) {
    errors.push('Phone number is required');
  } else {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      errors.push('Phone number must be exactly 10 digits');
    }
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', '),
      errors: errors
    });
  }

  // Clean the phone number for storage
  req.body.phoneNumber = phoneNumber.replace(/\D/g, '');
  
  next();
};

/**
 * Validates user login data
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Validate email
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }

  // Validate password
  if (!password || password.trim().length === 0) {
    errors.push('Password is required');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', '),
      errors: errors
    });
  }

  next();
};

/**
 * Validates user profile update data
 */
const validateProfileUpdate = (req, res, next) => {
  const { name, email, phoneNumber } = req.body;
  const errors = [];

  // Validate name if provided
  if (name !== undefined) {
    if (!name || name.trim().length === 0) {
      errors.push('Name cannot be empty');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
  }

  // Validate email if provided
  if (email !== undefined) {
    if (!email || email.trim().length === 0) {
      errors.push('Email cannot be empty');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }
    }
  }

  // Validate phone number if provided
  if (phoneNumber !== undefined) {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      errors.push('Phone number cannot be empty');
    } else {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        errors.push('Phone number must be exactly 10 digits');
      } else {
        // Clean the phone number for storage
        req.body.phoneNumber = cleanPhone;
      }
    }
  }

  // Validate password if provided
  if (req.body.password !== undefined) {
    const { password } = req.body;
    if (!password || password.trim().length === 0) {
      errors.push('Password cannot be empty');
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        errors.push('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
      }
    }
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', '),
      errors: errors
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate
};