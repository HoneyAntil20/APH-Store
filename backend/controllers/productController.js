const Product = require('../models/productModel');
const LocalProduct = require('../models/localProductModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;
    const category = req.query.category || '';
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Add category filter if provided
    const categoryFilter = category ? { category } : {};

    // Combine filters
    const filter = { ...keyword, ...categoryFilter };

    let count, products;

    if (process.env.USE_LOCAL_DB === 'true') {
      // Use local database
      count = await LocalProduct.countDocuments(filter);
      products = await LocalProduct.findWithPagination(filter, {
        limit: pageSize,
        skip: pageSize * (page - 1)
      });
    } else {
      // Use MongoDB
      count = await Product.countDocuments(filter);
      products = await Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    }

    res.json({
      success: true,
      data: {
        products,
        page,
        pages: Math.ceil(count / pageSize),
        totalProducts: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    let product;

    if (process.env.USE_LOCAL_DB === 'true') {
      product = await LocalProduct.findById(req.params.id);
    } else {
      product = await Product.findById(req.params.id);
    }

    if (product) {
      res.json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      originalPrice,
      discount,
      description,
      features,
      images,
      image,
      category,
      stock,
    } = req.body;

    const productData = {
      title,
      price,
      originalPrice,
      discount,
      description,
      features,
      images,
      image,
      category,
      stock,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      user: req.user ? req.user._id : 'admin',
    };

    let createdProduct;

    if (process.env.USE_LOCAL_DB === 'true') {
      createdProduct = await LocalProduct.create(productData);
    } else {
      const product = new Product(productData);
      createdProduct = await product.save();
    }

    res.status(201).json({
      success: true,
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      originalPrice,
      discount,
      description,
      features,
      images,
      image,
      category,
      stock,
    } = req.body;

    let updatedProduct;

    if (process.env.USE_LOCAL_DB === 'true') {
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (price !== undefined) updates.price = price;
      if (originalPrice !== undefined) updates.originalPrice = originalPrice;
      if (discount !== undefined) updates.discount = discount;
      if (description !== undefined) updates.description = description;
      if (features !== undefined) updates.features = features;
      if (images !== undefined) updates.images = images;
      if (image !== undefined) updates.image = image;
      if (category !== undefined) updates.category = category;
      if (stock !== undefined) updates.stock = stock;

      updatedProduct = await LocalProduct.findByIdAndUpdate(req.params.id, updates);
    } else {
      const product = await Product.findById(req.params.id);

      if (product) {
        product.title = title || product.title;
        product.price = price || product.price;
        product.originalPrice = originalPrice || product.originalPrice;
        product.discount = discount || product.discount;
        product.description = description || product.description;
        product.features = features || product.features;
        product.images = images || product.images;
        product.image = image || product.image;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        updatedProduct = await product.save();
      }
    }

    if (updatedProduct) {
      res.json({
        success: true,
        data: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    let deletedProduct;

    if (process.env.USE_LOCAL_DB === 'true') {
      deletedProduct = await LocalProduct.findByIdAndDelete(req.params.id);
    } else {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.deleteOne();
        deletedProduct = product;
      }
    }

    if (deletedProduct) {
      res.json({
        success: true,
        message: 'Product removed',
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400).json({
          success: false,
          error: 'Product already reviewed',
        });
        return;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.reviewCount = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({
        success: true,
        message: 'Review added',
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    let products;

    if (process.env.USE_LOCAL_DB === 'true') {
      products = await LocalProduct.findWithPagination({}, {
        limit: 5,
        sort: { rating: -1 }
      });
    } else {
      products = await Product.find({}).sort({ rating: -1 }).limit(5);
    }

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    let products;

    if (process.env.USE_LOCAL_DB === 'true') {
      products = await LocalProduct.find({ category: req.params.category });
    } else {
      products = await Product.find({ category: req.params.category });
    }

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
};