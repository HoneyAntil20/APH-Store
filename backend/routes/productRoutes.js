const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getProducts);
router.get('/top', getTopProducts);
router.get('/category/:category', getProductsByCategory);
router.route('/:id').get(getProductById);

// Protected routes
router.route('/:id/reviews').post(protect, createProductReview);

// Admin routes
router.route('/')
  .post(protect, admin, createProduct);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;