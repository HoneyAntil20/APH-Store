const fs = require('fs');
const path = require('path');
const asyncHandler = require('../middleware/asyncHandler');

// Path to cart.json file
const cartFilePath = path.join(__dirname, '../data/cart.json');

// Helper function to read cart data
const readCartData = () => {
  try {
    const cartData = fs.readFileSync(cartFilePath, 'utf8');
    return JSON.parse(cartData);
  } catch (error) {
    console.error('Error reading cart data:', error);
    return { cartItems: [] };
  }
};

// Helper function to write cart data
const writeCartData = (data) => {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing cart data:', error);
    return false;
  }
};

// @desc    Get all cart items
// @route   GET /api/cart
// @access  Public
const getCartItems = asyncHandler(async (req, res) => {
  const cartData = readCartData();
  res.json(cartData.cartItems);
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addCartItem = asyncHandler(async (req, res) => {
  const { customerId, productId, price, quantity } = req.body;

  // Validate required fields
  if (!customerId || !productId || !price || !quantity) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const cartData = readCartData();
  
  // Check if item already exists in cart
  const existingItemIndex = cartData.cartItems.findIndex(
    item => item.customerId === customerId && item.productId === productId
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cartData.cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item if it doesn't exist
    cartData.cartItems.push({
      id: Date.now().toString(), // Generate a unique ID
      customerId,
      productId,
      price,
      quantity
    });
  }

  // Write updated cart data
  const success = writeCartData(cartData);

  if (success) {
    res.status(201).json(cartData.cartItems);
  } else {
    res.status(500);
    throw new Error('Failed to add item to cart');
  }
});

// @desc    Update cart item
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const cartData = readCartData();
  const itemIndex = cartData.cartItems.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  // Update quantity
  cartData.cartItems[itemIndex].quantity = quantity;

  // Write updated cart data
  const success = writeCartData(cartData);

  if (success) {
    res.json(cartData.cartItems[itemIndex]);
  } else {
    res.status(500);
    throw new Error('Failed to update cart item');
  }
});

// @desc    Remove cart item
// @route   DELETE /api/cart/:id
// @access  Public
const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cartData = readCartData();
  const itemIndex = cartData.cartItems.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  // Remove item from cart
  cartData.cartItems.splice(itemIndex, 1);

  // Write updated cart data
  const success = writeCartData(cartData);

  if (success) {
    res.json({ message: 'Item removed from cart' });
  } else {
    res.status(500);
    throw new Error('Failed to remove item from cart');
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = asyncHandler(async (req, res) => {
  const cartData = { cartItems: [] };
  
  // Write updated cart data
  const success = writeCartData(cartData);

  if (success) {
    res.json({ message: 'Cart cleared successfully' });
  } else {
    res.status(500);
    throw new Error('Failed to clear cart');
  }
});

// @desc    Get cart items by customer ID
// @route   GET /api/cart/customer/:customerId
// @access  Public
const getCartItemsByCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const cartData = readCartData();
  const customerItems = cartData.cartItems.filter(item => item.customerId === customerId);

  res.json(customerItems);
});

// @desc    Get all users with their cart details (Admin)
// @route   GET /api/cart/admin/all-users
// @access  Private/Admin
const getAllUsersWithCarts = asyncHandler(async (req, res) => {
  const LocalUser = require('../models/localUserModel');
  
  try {
    let users;
    
    if (process.env.USE_LOCAL_DB === 'true') {
      users = await LocalUser.find();
      // Remove passwords from response
      users = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } else {
      const User = require('../models/userModel');
      users = await User.find({}).select('-password');
    }

    // Calculate cart statistics for each user
    const usersWithCartStats = users.map(user => ({
      ...user,
      cartStats: {
        totalItems: user.cart?.totalItems || 0,
        totalAmount: user.cart?.totalAmount || 0,
        itemCount: user.cart?.items?.length || 0
      }
    }));

    res.json({
      success: true,
      data: usersWithCartStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get specific user's cart details (Admin)
// @route   GET /api/cart/admin/user/:userId
// @access  Private/Admin
const getUserCartDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const LocalUser = require('../models/localUserModel');
  
  try {
    let user;
    
    if (process.env.USE_LOCAL_DB === 'true') {
      user = await LocalUser.findById(userId);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    } else {
      const User = require('../models/userModel');
      user = await User.findById(userId).select('-password');
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        cart: user.cart || { items: [], totalAmount: 0, totalItems: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Clear specific user's cart (Admin)
// @route   DELETE /api/cart/admin/user/:userId
// @access  Private/Admin
const clearUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const LocalUser = require('../models/localUserModel');
  
  try {
    let updatedUser;
    
    if (process.env.USE_LOCAL_DB === 'true') {
      updatedUser = await LocalUser.clearCart(userId);
    } else {
      const User = require('../models/userModel');
      const user = await User.findById(userId);
      if (user) {
        user.cart = { items: [], totalAmount: 0, totalItems: 0 };
        updatedUser = await user.save();
      }
    }

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemsByCustomer,
  getAllUsersWithCarts,
  getUserCartDetails,
  clearUserCart
};
