const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { 
  validateRegistration, 
  validateLogin, 
  validateProfileUpdate 
} = require('../middleware/validation');

// Public routes
router.post('/login', validateLogin, loginUser);
router.post('/register', validateRegistration, registerUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, validateProfileUpdate, updateUserProfile);

module.exports = router;