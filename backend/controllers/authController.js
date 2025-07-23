const User = require('../models/userModel');
const LocalUser = require('../models/localUserModel');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    let passwordMatch = false;

    if (process.env.USE_LOCAL_DB === 'true') {
      // Use local database
      user = await LocalUser.findByEmail(email);
      if (user) {
        passwordMatch = await LocalUser.comparePassword(password, user.password);
      }
    } else {
      // Use MongoDB
      user = await User.findOne({ email });
      if (user) {
        passwordMatch = await user.matchPassword(password);
      }
    }

    // Check if user exists and password matches
    if (user && passwordMatch) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          address: user.address,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    let userExists;
    
    if (process.env.USE_LOCAL_DB === 'true') {
      // Use local database
      userExists = await LocalUser.findByEmail(email);
    } else {
      // Use MongoDB
      userExists = await User.findOne({ email });
    }

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email address',
      });
    }

    let user;
    
    if (process.env.USE_LOCAL_DB === 'true') {
      // Create new user in local database
      user = await LocalUser.create({
        name,
        email,
        password,
        phone: phoneNumber,
      });
    } else {
      // Create new user in MongoDB
      user = await User.create({
        name,
        email,
        password,
        phoneNumber,
      });
    }

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || user.phoneNumber,
          isAdmin: user.isAdmin,
          address: user.address,
          token: generateToken(user._id),
        },
        message: 'User registered successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid user data',
      });
    }
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: validationErrors.join(', '),
      });
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email address',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error occurred during registration',
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    let user;

    if (process.env.USE_LOCAL_DB === 'true') {
      user = await LocalUser.findById(req.user._id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    } else {
      user = await User.findById(req.user._id);
    }

    if (user) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || user.phoneNumber,
          isAdmin: user.isAdmin,
          address: user.address,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    let user;
    let updatedUser;

    if (process.env.USE_LOCAL_DB === 'true') {
      // Use local database
      user = await LocalUser.findById(req.user._id);
      
      if (user) {
        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.phone) updates.phone = req.body.phone;
        if (req.body.phoneNumber) updates.phone = req.body.phoneNumber;
        
        // Update address if provided
        if (req.body.address) {
          updates.address = {
            ...user.address,
            ...req.body.address,
          };
        }

        // Update password if provided
        if (req.body.password) {
          updates.password = await LocalUser.hashPassword(req.body.password);
        }

        updatedUser = await LocalUser.findByIdAndUpdate(req.user._id, updates);
      }
    } else {
      // Use MongoDB
      user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        
        // Update address if provided
        if (req.body.address) {
          user.address = {
            ...user.address,
            ...req.body.address,
          };
        }

        // Update password if provided
        if (req.body.password) {
          user.password = req.body.password;
        }

        updatedUser = await user.save();
      }
    }

    if (updatedUser) {
      res.json({
        success: true,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone || updatedUser.phoneNumber,
          isAdmin: updatedUser.isAdmin,
          address: updatedUser.address,
          token: generateToken(updatedUser._id),
        },
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};