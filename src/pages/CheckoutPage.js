import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faCreditCard, 
  faMoneyBillWave, 
  faLock, 
  faShieldAlt,
  faTruck,
  faUndo,
  faExclamationTriangle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { getCartItemsByCustomer } from '../services/cartService';
import '../styles/Notification.css';
import '../styles/Loading.css';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  LocalShipping as LocalShippingIcon,
  AssignmentReturn as AssignmentReturnIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  Receipt as ReceiptIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });
  
  // Cart and order states
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        const items = await getCartItemsByCustomer(currentUser.email);
        
        // Fetch product details for each cart item
        const itemsWithDetails = await Promise.all(items.map(async (item) => {
          // In a real app, you would fetch product details from API
          // For now, we'll use placeholder data
          return {
            ...item,
            title: `Product ${item.productId}` // This would come from your product API
          };
        }));
        
        setCartItems(itemsWithDetails);
        setLoading(false);
        
        // Pre-fill form with user data if available
        if (currentUser) {
          const names = currentUser.name ? currentUser.name.split(' ') : ['', ''];
          setFormData(prev => ({
            ...prev,
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: currentUser.email || '',
            phone: currentUser.phone || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCartItems();
  }, [isAuthenticated, currentUser, navigate]);
  
  // Calculate order summary
  const orderSummary = {
    items: cartItems,
    subtotal: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    shipping: 0, // Free shipping
    discount: 0, // No discount for now
    get total() {
      return this.subtotal + this.shipping - this.discount;
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would send the order to the server
      console.log('Checkout data:', {
        customer: {
          ...formData,
          email: currentUser.email
        },
        items: cartItems,
        total: orderSummary.total
      });
      
      // Clear cart (in a real app, this would be done after successful order creation)
      // For now, we'll just show a success message
      alert('Order placed successfully!');
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  return (
    <Layout>
      {error && (
        <div className="notification error">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>{error}</span>
        </div>
      )}
      
      {loading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading checkout information...</span>
        </div>
      ) : (
      <>
      {/* Page Header */}
      <div className="page-header" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")` }}>
        <h1>Checkout</h1>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb container">
        <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} /> 
        <Link to="/cart">Cart</Link> <FontAwesomeIcon icon={faChevronRight} /> 
        <span>Checkout</span>
      </div>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State/Province *</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">ZIP/Postal Code *</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select 
                  id="country" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <div className="payment-method">
                <input 
                  type="radio" 
                  id="credit-card" 
                  name="paymentMethod" 
                  value="credit-card" 
                  checked={formData.paymentMethod === 'credit-card'} 
                  onChange={handleInputChange} 
                />
                <label htmlFor="credit-card">
                  <FontAwesomeIcon icon={faCreditCard} /> Credit/Debit Card
                </label>
              </div>
              <div className="payment-method">
                <input 
                  type="radio" 
                  id="paypal" 
                  name="paymentMethod" 
                  value="paypal" 
                  checked={formData.paymentMethod === 'paypal'} 
                  onChange={handleInputChange} 
                />
                <label htmlFor="paypal">
                  <FontAwesomeIcon icon={faMoneyBillWave} /> PayPal
                </label>
              </div>
            </div>

            {formData.paymentMethod === 'credit-card' && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    name="cardNumber" 
                    value={formData.cardNumber} 
                    onChange={handleInputChange} 
                    placeholder="1234 5678 9012 3456" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card *</label>
                  <input 
                    type="text" 
                    id="cardName" 
                    name="cardName" 
                    value={formData.cardName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input 
                      type="text" 
                      id="expiryDate" 
                      name="expiryDate" 
                      value={formData.expiryDate} 
                      onChange={handleInputChange} 
                      placeholder="MM/YY" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input 
                      type="text" 
                      id="cvv" 
                      name="cvv" 
                      value={formData.cvv} 
                      onChange={handleInputChange} 
                      placeholder="123" 
                      required 
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group checkbox">
              <input 
                type="checkbox" 
                id="saveInfo" 
                name="saveInfo" 
                checked={formData.saveInfo} 
                onChange={handleInputChange} 
              />
              <label htmlFor="saveInfo">Save this information for next time</label>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Review Order</h2>
            <div className="order-review">
              <div className="review-items">
                {orderSummary.items.map(item => (
                  <div key={item.id} className="review-item">
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="review-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{orderSummary.shipping === 0 ? 'Free' : `₹${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-₹{orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-actions">
            <div className="secure-checkout">
              <FontAwesomeIcon icon={faLock} />
              <span>Secure Checkout</span>
            </div>
            <button type="submit" className="btn place-order-btn">Place Order</button>
          </div>
        </form>

        <div className="checkout-sidebar">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({orderSummary.items.reduce((total, item) => total + item.quantity, 0)})</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{orderSummary.shipping === 0 ? 'Free' : `₹${orderSummary.shipping.toFixed(2)}`}</span>
              </div>
              {orderSummary.discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-₹{orderSummary.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Order Total</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-benefits">
            <div className="benefit">
              <FontAwesomeIcon icon={faTruck} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over ₹100</p>
              </div>
            </div>
            <div className="benefit">
              <FontAwesomeIcon icon={faUndo} />
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="benefit">
              <FontAwesomeIcon icon={faShieldAlt} />
              <div>
                <h4>Secure Payment</h4>
                <p>Your data is protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </Layout>
  );
};

export default CheckoutPage;