import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BannerSlider from '../components/common/BannerSlider';
import CategoryCard from '../components/common/CategoryCard';
import ProductCard from '../components/common/ProductCard';
import { useProducts, useTopProducts } from '../hooks/useProducts';
import '../styles/PageTransitions.css';
import { 
  faLaptop, 
  faTshirt, 
  faMobileAlt, 
  faDumbbell, 
  faBook 
} from '@fortawesome/free-solid-svg-icons';
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
  Chip,
  Stack,
  Avatar,
  Rating,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Zoom,
  Slide,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  AssignmentReturn as AssignmentReturnIcon,
  CreditCard as CreditCardIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  LocalOffer as LocalOfferIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  FlashOn as FlashOnIcon,
  NewReleases as NewReleasesIcon,
  Favorite as FavoriteIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Get products from API
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { products: topProducts, loading: topProductsLoading } = useTopProducts();

  // Simulate page loading
  useEffect(() => {
    // Set a short timeout to simulate loading and ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Banner slides data
  const bannerSlides = [
    {
      title: 'New Season Arrivals',
      description: 'Check out all the new trends',
      buttonText: 'Shop Now',
      linkTo: '/fashion',
      backgroundImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80'
    },
    {
      title: 'Huge Sale - Up to 70% Off',
      description: 'Limited time offer on top brands',
      buttonText: 'View Deals',
      linkTo: '/electronics',
      backgroundImage: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80'
    },
    {
      title: 'Tech Gadgets Collection',
      description: 'Latest gadgets for your lifestyle',
      buttonText: 'Explore',
      linkTo: '/mobiles',
      backgroundImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80'
    }
  ];

  // Categories data
  const categories = [
    { name: 'Electronics', icon: faLaptop, path: '/electronics' },
    { name: 'Fashion', icon: faTshirt, path: '/fashion' },
    { name: 'Mobiles', icon: faMobileAlt, path: '/mobiles' },
    { name: 'Sports', icon: faDumbbell, path: '/sports' },
    { name: 'Books', icon: faBook, path: '/books' }
  ];

  // Get products with discounts for hot deals
  const hotDealsProducts = products
    .filter(product => product.discount && product.discount > 0)
    .sort((a, b) => parseInt(b.discount) - parseInt(a.discount))
    .slice(0, 4);

  // Use top products from API for trending section
  const trendingProducts = topProducts.slice(0, 4);

  return (
    <Layout>
      {isLoading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className={`page-transition-container ${isLoading ? '' : 'fade-in'}`}>
        {/* Banner Slider */}
        <BannerSlider slides={bannerSlides} />



      {/* Hot Deals Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <FlashOnIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="h4" component="h2" color="error">
            Hot Deals
          </Typography>
          <Chip 
            label="Limited Time" 
            color="error" 
            size="small" 
            sx={{ ml: 2 }}
          />
        </Box>
        
        <Grid container spacing={3}>
          {productsLoading ? (
            // Loading skeleton for hot deals
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: 300 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                </Card>
              </Grid>
            ))
          ) : productsError ? (
            <Grid item xs={12}>
              <Alert severity="error">
                Failed to load products: {productsError}
              </Alert>
            </Grid>
          ) : hotDealsProducts.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">
                No hot deals available at the moment.
              </Alert>
            </Grid>
          ) : (
            hotDealsProducts.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product._id || product.id}>
              <Zoom in={true} timeout={300}>
                <Box 
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    '&:hover .product-card': { 
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <ProductCard product={product} />
                  <Badge
                    badgeContent={`-${product.discount}%`}
                    color="error"
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      zIndex: 1,
                      '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Categories Section */}
      <section>
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section>
        <h2 className="section-title">Trending Products</h2>
        <div className="product-grid">
          {topProductsLoading ? (
            // Loading skeleton for trending products
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ padding: '16px' }}>
                <Card sx={{ height: 300 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                </Card>
              </div>
            ))
          ) : trendingProducts.length === 0 ? (
            <Alert severity="info">
              No trending products available at the moment.
            </Alert>
          ) : (
            trendingProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          )}
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default HomePage;