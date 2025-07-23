import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/LogoutPage.css';
import '../styles/PageTransitions.css';
import usePageTransition from '../hooks/usePageTransition';

const LogoutPage = () => {
  const { logout } = useAuth();
  const { isLoading, navigateWithTransition } = usePageTransition();

  useEffect(() => {
    // Perform logout
    logout();
    
    // Set a timer to redirect to login page after showing the logout message
    const timer = setTimeout(() => {
      navigateWithTransition('/login');
    }, 3000);
    
    // Clean up the timer
    return () => clearTimeout(timer);
  }, [logout, navigateWithTransition]);

  return (
    <div className="logout-container logout-page">
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="logout-content content-preload">
        <div className="logout-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1>You've been logged out successfully</h1>
        <p>Thank you for visiting APH Store. You will be redirected to the login page shortly.</p>
        <button 
          className="login-button"
          onClick={() => navigateWithTransition('/login')}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;