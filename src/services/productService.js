/**
 * Product API service for connecting to the backend server
 */

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Generic API call function with error handling
 */
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    throw error;
  }
};

/**
 * Get all products with optional filters
 */
export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.page) queryParams.append('page', filters.page);
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.keyword) queryParams.append('keyword', filters.keyword);
  
  const queryString = queryParams.toString();
  const url = `/products${queryString ? `?${queryString}` : ''}`;
  
  return await apiCall(url);
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  return await apiCall(`/products/${id}`);
};

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  return await apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

/**
 * Update an existing product
 */
export const updateProduct = async (id, productData) => {
  return await apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  return await apiCall(`/products/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Get top-rated products
 */
export const getTopProducts = async () => {
  return await apiCall('/products/top');
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (category) => {
  return await apiCall(`/products/category/${category}`);
};

/**
 * Add a product review
 */
export const addProductReview = async (productId, reviewData) => {
  return await apiCall(`/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};

/**
 * Check server health
 */
export const checkServerHealth = async () => {
  return await apiCall('/health');
};

// Export all functions as default for easy importing
export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getProductsByCategory,
  addProductReview,
  checkServerHealth,
};