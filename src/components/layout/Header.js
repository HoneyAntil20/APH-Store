import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Header.css';
import '../../styles/PageTransitions.css';
import usePageTransition from '../../hooks/usePageTransition';
import { 
  faUser, 
  faShoppingCart, 
  faSearch, 
  faLaptop, 
  faTshirt, 
  faHome, 
  faMobileAlt, 
  faDumbbell, 
  faBook, 
  faEllipsisH,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { getCartItemsByCustomer } from '../../services/cartService';

const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { isLoading, navigateWithTransition } = usePageTransition();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch cart items count when user is authenticated
  useEffect(() => {
    const fetchCartCount = async () => {
      if (isAuthenticated() && currentUser?.email) {
        try {
          const cartItems = await getCartItemsByCustomer(currentUser.email);
          // Calculate total items in cart
          const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error('Error fetching cart count:', error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    fetchCartCount();
    
    // Set up interval to refresh cart count every 5 seconds for more dynamic updates
    const intervalId = setInterval(fetchCartCount, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isAuthenticated, currentUser]);
  
  // Listen for custom cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      const fetchCartCount = async () => {
        if (isAuthenticated() && currentUser?.email) {
          try {
            const cartItems = await getCartItemsByCustomer(currentUser.email);
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalItems);
          } catch (error) {
            console.error('Error fetching cart count:', error);
          }
        }
      };
      fetchCartCount();
    };
    
    // Add event listener for cart updates
    window.addEventListener('cart-updated', handleCartUpdate);
    
    // Clean up
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, [isAuthenticated, currentUser]);

  const handleLogout = () => {
    navigateWithTransition('/logout');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter products
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header>
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="container">
        <div className="header-top">
          <div className="logo">
            <Link to={isAuthenticated() ? "/home" : "/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
              APH Store
            </Link>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for products, brands and more..." 
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
          </div>
          <div className="user-actions">
            {isAuthenticated() ? (
              <>
                <Link to="/profile" className="user-profile">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="user-name">{currentUser?.name?.split(' ')[0]}</span>
                </Link>
                <Link to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="cart-count">{cartCount}</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </>
            ) : (
              <Link to="/login" className="login-link">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            )}
          </div>
        </div>
        <nav className="nav-categories">
          <Link to="/electronics">
            <FontAwesomeIcon icon={faLaptop} /> Electronics
          </Link>
          <Link to="/fashion">
            <FontAwesomeIcon icon={faTshirt} /> Fashion
          </Link>
          <Link to="/mobiles">
            <FontAwesomeIcon icon={faMobileAlt} /> Mobiles
          </Link>
          <Link to="/sports">
            <FontAwesomeIcon icon={faDumbbell} /> Sports
          </Link>
          <Link to="/books">
            <FontAwesomeIcon icon={faBook} /> Books
          </Link>
          <Link to="/more">
            <FontAwesomeIcon icon={faEllipsisH} /> More
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;