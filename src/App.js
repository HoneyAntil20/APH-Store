import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './styles.css';
import './styles/PageTransitions.css';

// Import AuthContext provider
import { AuthProvider, useAuth } from './context/AuthContext';
import PageTransitionWrapper from './components/common/PageTransitionWrapper';

// Import pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ElectronicsPage from './pages/ElectronicsPage';
import FashionPage from './pages/FashionPage';
import MobilesPage from './pages/MobilesPage';
import SportsPage from './pages/SportsPage';
import BooksPage from './pages/BooksPage';
import MorePage from './pages/MorePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';

import HomeCategoryPage from './pages/HomeCategoryPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminCustomersPageNew from './pages/admin/AdminCustomersPageNew';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminCartPage from './pages/admin/AdminCartPage';
import ComponentShowcase from './pages/ComponentShowcase';
import AuthDemo from './pages/AuthDemo';

// Auth check functions
const isAuthenticated = () => {
  return localStorage.getItem('userData') !== null;
};

const isAdminAuthenticated = () => {
  const adminData = localStorage.getItem('adminData');
  if (!adminData) return false;
  
  try {
    const parsed = JSON.parse(adminData);
    return parsed.isAdmin === true;
  } catch (e) {
    return false;
  }
};

// Protected route components
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    // Check authentication with a small delay to ensure smooth transitions
    const checkAuth = setTimeout(() => {
      setIsAuth(isAuthenticated());
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    // Check authentication with a small delay to ensure smooth transitions
    const checkAuth = setTimeout(() => {
      setIsAuth(isAdminAuthenticated());
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!isAuth) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <PageTransitionWrapper>
            <Routes>
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Main Pages */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/electronics" element={<ElectronicsPage />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/home-category" element={<HomeCategoryPage />} />
          <Route path="/mobiles" element={<MobilesPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/more" element={<MorePage />} />
          
          {/* User Pages */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Info Pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Component Showcase */}
          <Route path="/components" element={<ComponentShowcase />} />
          
          {/* Auth Demo */}
          <Route path="/auth-demo" element={<AuthDemo />} />
          
          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <AdminProtectedRoute>
              <AdminProductsPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminProtectedRoute>
              <AdminOrdersPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/customers" element={
            <AdminProtectedRoute>
              <AdminCustomersPageNew />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <AdminProtectedRoute>
              <AdminAnalyticsPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/cart" element={
            <AdminProtectedRoute>
              <AdminCartPage />
            </AdminProtectedRoute>
          } />
          </Routes>
          </PageTransitionWrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
