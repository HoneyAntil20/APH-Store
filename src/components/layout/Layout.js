import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/PageTransitions.css';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate page loading for smooth transitions
  useEffect(() => {
    // Set a short timeout to simulate loading and ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <main className={`page-transition-container ${isLoading ? '' : 'fade-in'}`}>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;