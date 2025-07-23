import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart, faTruck, faUndo, faShieldAlt, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import ProductCard from '../components/common/ProductCard';
import { useProduct } from '../hooks/useProducts';
import { getProductsByCategory } from '../services/productService';
import { addCartItem } from '../services/cartService';
import '../styles/Notification.css';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Rating,
  Stack,
  Divider,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Badge,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Container,
  Fab,
  Tooltip,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  AssignmentReturn as AssignmentReturnIcon,
  Security as SecurityIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Info as InfoIcon,
  Compare as CompareIcon,
  ZoomIn as ZoomInIcon
} from '@mui/icons-material';

const ProductPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Set main image and fetch related products when product loads
  useEffect(() => {
    if (product) {
      // Set main image from product data
      if (product.images && product.images.length > 0) {
        setMainImage(product.images[0]);
      } else if (product.image) {
        setMainImage(product.image);
      }
      
      // Fetch related products from the same category
      if (product.category) {
        fetchRelatedProducts(product.category, product._id);
      }
    }
  }, [product]);

  // Fetch related products
  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await getProductsByCategory(category);
      if (response.success) {
        // Filter out current product and limit to 3 items
        const related = response.data
          .filter(p => p._id !== currentProductId)
          .slice(0, 3);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStarRegular} />);
    }

    return stars;
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Wishlist functionality removed as per requirements

  const handleAddToCart = async () => {
    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const customerId = userData.email || 'guest';
      
      // Create cart item object
      const cartItem = {
        customerId,
        productId: product._id,
        price: product.price,
        quantity: quantity
      };
      
      // Add item to cart
      await addCartItem(cartItem);
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      // Show success notification
      setNotification({
        show: true,
        message: `Added ${quantity} ${product.title} to cart`,
        type: 'success'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    } catch (error) {
      // Show error notification with more specific error message
      let errorMessage = 'Failed to add item to cart. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setNotification({
        show: true,
        message: errorMessage,
        type: 'error'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography variant="h6" color="text.secondary">
              Loading product details...
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography variant="h6" color="error">
              {error || 'Product not found'}
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Product Images - Reduced size by 90% */}
          <Grid item xs={12} md={2}>
            <Card elevation={0} sx={{ mb: 2, maxWidth: '40%' }}>
              <CardMedia
                component="img"
                height="120"
                image={mainImage}
                alt={product.title}
                sx={{ 
                  objectFit: 'contain', 
                  cursor: 'pointer',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1
                }}
                onClick={() => setZoomDialogOpen(true)}
              />
              <Tooltip title="Click to zoom" placement="top">
                <Fab
                  size="small"
                  color="primary"
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                  onClick={() => setZoomDialogOpen(true)}
                >
                  <ZoomInIcon />
                </Fab>
              </Tooltip>
            </Card>
            
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, maxWidth: '40%' }}>
              {(product.images || [product.image]).filter(Boolean).map((image, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    minWidth: 30, 
                    cursor: 'pointer',
                    border: mainImage === image ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    '&:hover': { borderColor: '#1976d2' }
                  }}
                  onClick={() => {
                    setMainImage(image);
                    setSelectedImageIndex(index);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="30"
                    image={image}
                    alt={`${product.title} - angle ${index + 1}`}
                    sx={{ objectFit: 'contain' }}
                  />
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Product Details - Positioned on the right side */}
          <Grid item xs={12} md={10}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                  ₹{product.price.toFixed(2)}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="body1"
                    sx={{ 
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                      ml: 2
                    }}
                  >
                    ₹{product.originalPrice.toFixed(2)}
                  </Typography>
                )}
                {product.discount && (
                  <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>

              {/* Product Description - Prominently positioned */}
              <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Product Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {product.description}
                </Typography>
              </Paper>
              
              {/* Key Features - Prominently positioned */}
              <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Key Features
                </Typography>
                <List dense>
                  {product.features.map((feature, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ 
                          fontSize: '0.95rem',
                          fontWeight: 500
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              {/* Product Specifications */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Specifications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Brand:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{product.brand || 'APH Store'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Category:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{product.category || 'General'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Warranty:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{product.warranty || '1 Year'}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              
              {/* Stock Status */}
              <Box sx={{ my: 2 }}>
                <Chip
                  label={product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  color={product.stock > 0 ? 'success' : 'error'}
                  icon={product.stock > 0 ? <CheckCircleIcon /> : <InfoIcon />}
                />
              </Box>
              
              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <ButtonGroup>
                  <Button onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <RemoveIcon />
                  </Button>
                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ 
                      min: 1, 
                      max: product.stock,
                      style: { textAlign: 'center', width: '60px' }
                    }}
                    size="small"
                  />
                  <Button onClick={increaseQuantity} disabled={quantity >= product.stock}>
                    <AddIcon />
                  </Button>
                </ButtonGroup>
              </Box>
              
              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>
              </Stack>
              
              {/* Benefits */}
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">Free Shipping</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentReturnIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">30-Day Returns</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SecurityIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">1 Year Warranty</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Related Products */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            You May Also Like
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id || product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Image Zoom Dialog */}
      <Dialog
        open={zoomDialogOpen}
        onClose={() => setZoomDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Product Images</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={product.images[selectedImageIndex]}
              alt={product.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
            {product.images.map((image, index) => (
              <Avatar
                key={index}
                src={image}
                sx={{ 
                  width: 60, 
                  height: 60, 
                  cursor: 'pointer',
                  border: selectedImageIndex === index ? '2px solid #1976d2' : 'none'
                }}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setZoomDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ProductPage;
