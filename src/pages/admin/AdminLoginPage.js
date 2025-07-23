import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faShieldAlt 
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Stack,
  Divider,
  Link as MuiLink
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  AdminPanelSettings as AdminPanelSettingsIcon
} from '@mui/icons-material';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: 'admin@aphstore.com',
    password: 'password',
  });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    // Clear error when user types
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!loginData.email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!loginData.password) {
      setError('Please enter your password');
      return;
    }
    
    // Check admin credentials
    if (loginData.email === 'honeyantil92@gmail.com' && loginData.password === 'Honey@1234') {
      // Store admin status in localStorage
      localStorage.setItem('adminData', JSON.stringify({
        isAdmin: true,
        email: loginData.email,
        name: 'Admin User'
      }));
      
      // Redirect to admin dashboard
      navigate('/admin');
    } else if (loginData.email !== 'honeyantil92@gmail.com') {
      setError('No admin account found with this email address');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="admin-login-header">
          <FontAwesomeIcon icon={faShieldAlt} className="admin-icon" />
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>
        
        {error && <div className="admin-login-error" style={{color: 'red', padding: '10px', marginBottom: '15px', backgroundColor: '#ffebee', borderRadius: '4px'}}>{error}</div>}
        
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={loginData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={loginData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              required 
            />
          </div>
          
          <button type="submit" className="admin-login-btn">Login to Admin Panel</button>
          
          <div className="admin-login-footer">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
              Return to User Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;