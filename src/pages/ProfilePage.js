import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faUser, 
  faShoppingBag, 
  faHeart, 
  faAddressCard, 
  faCreditCard, 
  faBell, 
  faSignOutAlt, 
  faEdit, 
  faEye,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import UserRegistrationData from '../components/UserRegistrationData';
import '../styles/profile.css';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Chip,
  Badge,
  Stack,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Breadcrumbs
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon,
  CreditCard as CreditCardIcon,
  Notifications as NotificationsIcon,
  ExitToApp as ExitToAppIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarTodayIcon,
  Receipt as ReceiptIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon
} from '@mui/icons-material';

const ProfilePage = () => {
  const navigate = useNavigate();
  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');

  // User data from localStorage
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    joinDate: 'January 15, 2023',
    avatar: '/assets/images/avatar.png' // Use a generalized avatar
  });
  
  // Check if user is logged in
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  // Sample orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: 'June 15, 2023',
      total: 249.98,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-12346',
      date: 'May 28, 2023',
      total: 899.99,
      status: 'Delivered',
      items: 1
    },
    {
      id: 'ORD-12347',
      date: 'July 3, 2023',
      total: 149.99,
      status: 'Processing',
      items: 3
    }
  ];

  // No wishlist functionality as per requirements

  // Sample address data - only one address as per requirements
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ];

  // Sample payment methods data
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      cardHolder: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'PayPal',
      email: 'john.doe@example.com',
      isDefault: false
    }
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-info">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={userData.avatar} alt={userData.name} />
              </div>
              <div className="profile-details">
                <h2>{userData.name}</h2>
                <p><FontAwesomeIcon icon={faUser} className="profile-icon" /> {userData.email}</p>
                <p><FontAwesomeIcon icon={faAddressCard} className="profile-icon" /> {userData.phone}</p>
                <p><FontAwesomeIcon icon={faBell} className="profile-icon" /> Member since: {userData.joinDate}</p>
              </div>
              <button className="btn-outline">
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </button>
            </div>
            
            <div className="profile-section">
              <h3>Account Information</h3>
              <div className="account-info-card">
                <div className="info-item">
                  <strong>Full Name:</strong>
                  <span>{userData.name}</span>
                </div>
                <div className="info-item">
                  <strong>Email Address:</strong>
                  <span>{userData.email}</span>
                </div>
                <div className="info-item">
                  <strong>Phone Number:</strong>
                  <span>{userData.phone}</span>
                </div>
                <div className="info-item">
                  <strong>Member Since:</strong>
                  <span>{userData.joinDate}</span>
                </div>
              </div>
              <p className="profile-note">
                This information was provided during registration. If you need to update your information, 
                please contact customer support.
              </p>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="orders-section">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="btn">Start Shopping</Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p>Placed on {order.date}</p>
                      </div>
                      <div className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="order-details">
                      <div className="order-info">
                        <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                        <p><strong>Items:</strong> {order.items}</p>
                      </div>
                      <div className="order-actions">
                        <button className="btn-outline">
                          <FontAwesomeIcon icon={faEye} /> View Details
                        </button>
                        {order.status === 'Delivered' && (
                          <button className="btn-outline">Buy Again</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      // Wishlist functionality removed as per requirements
      
      case 'addresses':
        return (
          <div className="addresses-section">
            <div className="section-header">
              <h2>My Address</h2>
              <button className="btn">
                <FontAwesomeIcon icon={faEdit} /> Edit Address
              </button>
            </div>
            {addresses.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any addresses yet.</p>
                <button className="btn">Add Address</button>
              </div>
            ) : (
              <div className="addresses-grid">
                {addresses.map(address => (
                  <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                    {address.isDefault && <div className="default-badge">Default</div>}
                    <h3>{address.type}</h3>
                    <p>{address.name}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                    <div className="address-actions">
                      <button className="btn-outline">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      {!address.isDefault && (
                        <>
                          <button className="btn-outline">Set as Default</button>
                          <button className="btn-outline delete">Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'payment':
        return (
          <div className="payment-section">
            <div className="section-header">
              <h2>Payment Methods</h2>
              <button className="btn">
                <FontAwesomeIcon icon={faEdit} /> Add Payment Method
              </button>
            </div>
            {paymentMethods.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any payment methods yet.</p>
                <button className="btn">Add Payment Method</button>
              </div>
            ) : (
              <div className="payment-methods-grid">
                {paymentMethods.map(method => (
                  <div key={method.id} className={`payment-card ${method.isDefault ? 'default' : ''}`}>
                    {method.isDefault && <div className="default-badge">Default</div>}
                    <h3>{method.type}</h3>
                    {method.type === 'Credit Card' ? (
                      <>
                        <p>{method.cardNumber}</p>
                        <p>Expires: {method.expiryDate}</p>
                        <p>{method.cardHolder}</p>
                      </>
                    ) : (
                      <p>{method.email}</p>
                    )}
                    <div className="payment-actions">
                      <button className="btn-outline">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      {!method.isDefault && (
                        <>
                          <button className="btn-outline">Set as Default</button>
                          <button className="btn-outline delete">Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      // Notifications functionality removed as per requirements
      
      case 'registration':
        return (
          <div className="registration-section">
            <h2>Registration Data</h2>
            <p className="section-description">
              This information is stored in the registrations.json file and was created when you registered your account.
            </p>
            <UserRegistrationData userEmail={userData.email} />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="page-header" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")` }}>
        <h1>My Account</h1>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb container">
        <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} /> <span>My Account</span>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-menu">
            <button 
              className={`profile-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FontAwesomeIcon icon={faUser} /> Profile
            </button>
            <button 
              className={`profile-menu-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FontAwesomeIcon icon={faShoppingBag} /> Orders
            </button>
            {/* Wishlist button removed as per requirements */}
            <button 
              className={`profile-menu-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <FontAwesomeIcon icon={faAddressCard} /> Addresses
            </button>
            <button 
              className={`profile-menu-item ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <FontAwesomeIcon icon={faCreditCard} /> Payment Methods
            </button>
            {/* Notifications button removed as per requirements */}
            <button 
              className={`profile-menu-item ${activeTab === 'registration' ? 'active' : ''}`}
              onClick={() => setActiveTab('registration')}
            >
              <FontAwesomeIcon icon={faIdCard} /> Registration Data
            </button>
            <button 
              className="profile-menu-item logout"
              onClick={() => {
                localStorage.removeItem('userData');
                navigate('/login');
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </div>
        
        <div className="profile-content">
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;