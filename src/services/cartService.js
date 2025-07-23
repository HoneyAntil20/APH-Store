// API URL
const API_URL = 'http://localhost:5001/api/cart';

// Get all cart items
export const getCartItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error('Server responded with status:', response.status);
      throw new Error('Failed to fetch cart items');
    }
    const data = await response.json();
    
    // Ensure we always return an array
    if (!data) {
      console.warn('Cart API returned null or undefined data');
      return [];
    }
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.cartItems && Array.isArray(data.cartItems)) {
      return data.cartItems;
    } else {
      console.warn('Cart API returned unexpected data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

// Get cart items by customer ID
export const getCartItemsByCustomer = async (customerId) => {
  try {
    if (!customerId) {
      console.error('Invalid customer ID:', customerId);
      return [];
    }
    
    const response = await fetch(`${API_URL}/customer/${customerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch customer cart items');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching customer cart items:', error);
    return [];
  }
};

// Add item to cart
export const addCartItem = async (cartItem) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

// Update cart item
export const updateCartItem = async (id, quantity) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove cart item
export const removeCartItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Clear cart
export const clearCart = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};