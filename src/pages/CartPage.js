import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../context/AuthContext';
import '../styles/CartPage.css';
import '../styles/Notification.css';
import '../styles/Loading.css';
import { 
  faChevronRight, 
  faTrash, 
  faTruck, 
  faUndo, 
  faShieldAlt,
  faExclamationTriangle,
  faCheckCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { getCartItemsByCustomer, updateCartItem, removeCartItem } from '../services/cartService';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
  Badge,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  AssignmentReturn as AssignmentReturnIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const CartPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Cart items state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (currentUser && currentUser.email) {
          setLoading(true);
          const items = await getCartItemsByCustomer(currentUser.email);
          
          // Fetch product details for each cart item
          const itemsWithDetails = await Promise.all(items.map(async (item) => {
            try {
              // Fetch product details from API
              const response = await fetch(`http://localhost:5001/api/products/${item.productId}`);
              if (!response.ok) {
                throw new Error('Failed to fetch product details');
              }
              const productData = await response.json();
              
              return {
                ...item,
                title: productData.data.title || `Product ${item.productId}`,
                image: productData.data.image || productData.data.images?.[0] || '/assets/images/placeholder-image.jpg'
              };
            } catch (error) {
              console.error(`Error fetching details for product ${item.productId}:`, error);
              return {
                ...item,
                title: `Product ${item.productId}`,
                image: '/assets/images/placeholder-image.jpg'
              };
            }
          }));
          
          setCartItems(itemsWithDetails);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
        showNotification('Failed to load cart items. Please try again.', 'error');
      }
    };
    
    fetchCartItems();
  }, [currentUser]);

  // Helper function to show notifications
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Coupon code state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Shipping cost
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Calculate total
  const total = subtotal + shipping - discount;

  // Handle quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      // Update quantity in API
      await updateCartItem(id, newQuantity);
      
      // Update local state
      const updatedCart = cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      
      setCartItems(updatedCart);
      showNotification('Cart updated successfully', 'success');
    } catch (error) {
      console.error('Error updating cart item:', error);
      showNotification('Failed to update cart. Please try again.', 'error');
    }
  };

  // Handle remove item
  const handleRemoveItem = async (id) => {
    try {
      // Remove item from API
      await removeCartItem(id);
      
      // Update local state
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      showNotification('Item removed from cart', 'success');
    } catch (error) {
      console.error('Error removing cart item:', error);
      showNotification('Failed to remove item. Please try again.', 'error');
    }
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    // Simple coupon logic for demonstration
    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      setCouponApplied(true);
      setDiscount(subtotal * 0.2); // 20% discount
    } else {
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  return (
    <Layout>
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.show}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, show: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, show: false })}
          severity={notification.type === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      {loading ? (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading cart items...
            </Typography>
          </Box>
        </Container>
      ) : (
      <>
      {/* Page Header */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Shopping Cart
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Typography color="text.primary">Cart</Typography>
        </Breadcrumbs>

        {cartItems.length === 0 ? (
          <Paper elevation={2} sx={{ p: 8, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 80, height: 80 }}>
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Looks like you haven't added anything to your cart yet.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/" 
              size="large"
              startIcon={<ShoppingCartIcon />}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Cart Items ({cartItems.length})
              </Typography>
              <List>
                {cartItems.map(item => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <Card sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120 }}
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: ₹{item.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                          <ButtonGroup size="small" variant="outlined">
                            <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                              <RemoveIcon />
                            </Button>
                            <TextField
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              size="small"
                              sx={{ width: 80 }}
                              inputProps={{ min: 1, style: { textAlign: 'center' } }}
                            />
                            <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                              <AddIcon />
                            </Button>
                          </ButtonGroup>
                          <Typography variant="h6" color="primary">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
                        <Tooltip title="Remove from cart">
                          <IconButton 
                            color="error" 
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Card>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/"
                  startIcon={<ShoppingCartIcon />}
                >
                  Continue Shopping
                </Button>
                <Button variant="outlined" color="secondary">
                  Update Cart
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              {/* Coupon Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Have a coupon?
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outlined" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </Stack>
                {couponApplied && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Coupon applied successfully!
                  </Alert>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Summary Details */}
              <List>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="h6">₹{subtotal.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText primary="Shipping" />
                  <Typography variant="h6">
                    {shipping === 0 ? (
                      <Chip label="Free" color="success" size="small" />
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </Typography>
                </ListItem>
                {discount > 0 && (
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText primary="Discount" />
                    <Typography variant="h6" color="success.main">
                      -₹{discount.toFixed(2)}
                    </Typography>
                  </ListItem>
                )}
                <Divider />
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        Total
                      </Typography>
                    }
                  />
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    ₹{total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
              
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/checkout"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
              
              {/* Security Features */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Why shop with us?
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocalShippingIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Free Shipping" 
                      secondary="On orders over ₹500"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Secure Payment" 
                      secondary="100% secure checkout"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentReturnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Easy Returns" 
                      secondary="30-day return policy"
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        )}
      </Container>
      </>
      )}
    </Layout>
  );
};

export default CartPage;