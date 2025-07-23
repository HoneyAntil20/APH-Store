const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemsByCustomer,
  getAllUsersWithCarts,
  getUserCartDetails,
  clearUserCart
} = require('../controllers/cartController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all cart items and add new item
router.route('/')
  .get(getCartItems)
  .post(addCartItem)
  .delete(clearCart);

// Get cart items by customer ID
router.route('/customer/:customerId')
  .get(getCartItemsByCustomer);

// Update and remove cart item
router.route('/:id')
  .put(updateCartItem)
  .delete(removeCartItem);

// Admin routes for cart management
router.route('/admin/all-users')
  .get(protect, admin, getAllUsersWithCarts);

router.route('/admin/user/:userId')
  .get(protect, admin, getUserCartDetails)
  .delete(protect, admin, clearUserCart);

module.exports = router;