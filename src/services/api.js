// API Base Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com' 
  : 'http://localhost:5001';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const adminData = localStorage.getItem('adminData');
  if (adminData) {
    try {
      const { token } = JSON.parse(adminData);
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    } catch (e) {
      console.error('Error parsing admin data:', e);
    }
  }
  return {
    'Content-Type': 'application/json'
  };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: getAuthHeaders(),
      ...options
    };

    console.log('API Call:', url, config);

    const response = await fetch(url, config);
    
    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // Try to parse as JSON, fallback to text
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText };
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// User/Customer API calls
export const userAPI = {
  // Get all users
  getUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/api/users${queryString ? `?${queryString}` : ''}`);
  },

  // Get user by ID
  getUserById: (id) => apiCall(`/api/users/${id}`),

  // Create user
  createUser: (userData) => apiCall('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  // Update user
  updateUser: (id, userData) => apiCall(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),

  // Delete user
  deleteUser: (id) => apiCall(`/api/users/${id}`, {
    method: 'DELETE'
  })
};

// Product API calls
export const productAPI = {
  // Get all products
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/api/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get product by ID
  getProductById: (id) => apiCall(`/api/products/${id}`),

  // Create product
  createProduct: (productData) => apiCall('/api/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  }),

  // Update product
  updateProduct: (id, productData) => apiCall(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  }),

  // Delete product
  deleteProduct: (id) => apiCall(`/api/products/${id}`, {
    method: 'DELETE'
  })
};

// Order API calls
export const orderAPI = {
  // Get all orders
  getOrders: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/api/orders${queryString ? `?${queryString}` : ''}`);
  },

  // Get order by ID
  getOrderById: (id) => apiCall(`/api/orders/${id}`),

  // Create order
  createOrder: (orderData) => apiCall('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),

  // Update order
  updateOrder: (id, orderData) => apiCall(`/api/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData)
  }),

  // Delete order
  deleteOrder: (id) => apiCall(`/api/orders/${id}`, {
    method: 'DELETE'
  })
};

// Cart API calls
export const cartAPI = {
  // Get cart items
  getCartItems: (customerId) => {
    if (customerId) {
      return apiCall(`/api/cart/customer/${customerId}`);
    }
    return apiCall('/api/cart');
  },

  // Add to cart
  addToCart: (cartData) => apiCall('/api/cart', {
    method: 'POST',
    body: JSON.stringify(cartData)
  }),

  // Update cart item
  updateCartItem: (id, cartData) => apiCall(`/api/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cartData)
  }),

  // Remove from cart
  removeFromCart: (id) => apiCall(`/api/cart/${id}`, {
    method: 'DELETE'
  }),

  // Clear cart
  clearCart: (customerId) => apiCall(`/api/cart/customer/${customerId}`, {
    method: 'DELETE'
  })
};

// Auth API calls
export const authAPI = {
  // Admin login
  adminLogin: (credentials) => apiCall('/api/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  // User login
  userLogin: (credentials) => apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  // User register
  userRegister: (userData) => apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
};

// Health check
export const healthCheck = () => apiCall('/api/health');

// Legacy functions for backward compatibility
export const addRegistration = (registrationData) => userAPI.createUser(registrationData);
export const getRegistrations = () => userAPI.getUsers();
export const authenticateUser = (credentials) => authAPI.userLogin(credentials);

export default {
  userAPI,
  productAPI,
  orderAPI,
  cartAPI,
  authAPI,
  healthCheck
};