const User = require('../models/userModel');
const LocalUser = require('../models/localUserModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { email: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    let count, users;

    if (process.env.USE_LOCAL_DB === 'true') {
      // Use local database
      const allUsers = await LocalUser.find();
      
      // Apply search filter
      let filteredUsers = allUsers;
      if (req.query.keyword) {
        const searchTerm = req.query.keyword.toLowerCase();
        filteredUsers = allUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      }

      count = filteredUsers.length;
      users = filteredUsers
        .slice((page - 1) * pageSize, page * pageSize)
        .map(user => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
    } else {
      // Use MongoDB
      count = await User.countDocuments(keyword);
      users = await User.find(keyword)
        .select('-password')
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    }

    res.json({
      success: true,
      data: {
        users,
        page,
        pages: Math.ceil(count / pageSize),
        totalUsers: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    let user;

    if (process.env.USE_LOCAL_DB === 'true') {
      user = await LocalUser.findById(req.params.id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    } else {
      user = await User.findById(req.params.id).select('-password');
    }

    if (user) {
      res.json({
        success: true,
        data: user,
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

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    let updatedUser;

    if (process.env.USE_LOCAL_DB === 'true') {
      const user = await LocalUser.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      const updates = {};
      if (req.body.name !== undefined) updates.name = req.body.name;
      if (req.body.email !== undefined) updates.email = req.body.email;
      if (req.body.phone !== undefined) updates.phone = req.body.phone;
      if (req.body.isAdmin !== undefined) updates.isAdmin = req.body.isAdmin;
      if (req.body.status !== undefined) updates.status = req.body.status;
      
      // Update address if provided
      if (req.body.address) {
        updates.address = {
          ...user.address,
          ...req.body.address,
        };
      }

      updatedUser = await LocalUser.findByIdAndUpdate(req.params.id, updates);
      
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        updatedUser = userWithoutPassword;
      }
    } else {
      const user = await User.findById(req.params.id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
        user.status = req.body.status || user.status;
        
        // Update address if provided
        if (req.body.address) {
          user.address = {
            ...user.address,
            ...req.body.address,
          };
        }

        updatedUser = await user.save();
      }
    }

    if (updatedUser) {
      res.json({
        success: true,
        data: updatedUser,
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

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    let deletedUser;

    if (process.env.USE_LOCAL_DB === 'true') {
      deletedUser = await LocalUser.findByIdAndDelete(req.params.id);
    } else {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.deleteOne();
        deletedUser = user;
      }
    }

    if (deletedUser) {
      res.json({
        success: true,
        message: 'User removed',
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

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, isAdmin, status, address } = req.body;

    // Check if user already exists
    let existingUser;
    if (process.env.USE_LOCAL_DB === 'true') {
      existingUser = await LocalUser.findByEmail(email);
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists',
      });
    }

    const userData = {
      name,
      email,
      password,
      phone,
      isAdmin: isAdmin || false,
      status: status || 'active',
      address: address || {}
    };

    let createdUser;

    if (process.env.USE_LOCAL_DB === 'true') {
      createdUser = await LocalUser.create(userData);
      const { password: _, ...userWithoutPassword } = createdUser;
      createdUser = userWithoutPassword;
    } else {
      const user = new User(userData);
      createdUser = await user.save();
      createdUser = await User.findById(createdUser._id).select('-password');
    }

    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};