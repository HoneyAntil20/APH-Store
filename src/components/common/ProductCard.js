import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faHeart } from '@fortawesome/free-regular-svg-icons';
import MuiButton from '../ui/MuiButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
  // Removed wishlist functionality as per requirements
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const customerId = userData.email || 'guest';
      
      // Create cart item object
      const cartItem = {
        customerId,
        productId: product._id,
        price: product.price,
        quantity: 1
      };
      
      // Import addCartItem function
      const { addCartItem } = await import('../../services/cartService');
      
      // Add item to cart
      await addCartItem(cartItem);
      
      setAddedToCart(true);
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      // Reset button after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // Calculate discount percentage if not provided
  const calculateDiscount = () => {
    if (product.discount) return product.discount;
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return null;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
        {calculateDiscount() && (
          <div className="product-badge">-{calculateDiscount()}%</div>
        )}
        {/* Wishlist functionality removed as per requirements */}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h3 className="product-title">
          <Link to={`/product/${product._id}`}>{product.title}</Link>
        </h3>
        
        <div className="product-rating">
          <div className="rating-stars">
            <Rating 
              value={product.rating} 
              precision={0.5} 
              readOnly 
              size="small"
              sx={{ color: '#ffc107' }}
            />
          </div>
          <div className="rating-count">({product.reviewCount})</div>
        </div>
        
        <div className="product-price">
          <div className="current-price">₹{product.price.toFixed(2)}</div>
          {product.originalPrice && (
            <>
              <div className="original-price">₹{product.originalPrice.toFixed(2)}</div>
              <div className="discount-percentage">Save {calculateDiscount()}%</div>
            </>
          )}
        </div>
        
        <div className="product-actions">
          <MuiButton 
            variant={addedToCart ? "success" : "primary"}
            size="small"
            startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
            onClick={handleAddToCart}
            fullWidth
          >
            {addedToCart ? 'Added to Cart' : 'Add to Cart'}
          </MuiButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;