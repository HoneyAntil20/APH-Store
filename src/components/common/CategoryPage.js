import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../layout/Layout';
import ProductCard from './ProductCard';
import MuiButton from '../ui/MuiButton';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Rating,
  Divider,
  Stack,
  Card,
  CardContent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Drawer,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormGroup,
  RadioGroup,
  Radio,
  Collapse
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  Close as CloseIcon,
  Star as StarIcon,
  LocalOffer as LocalOfferIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const CategoryPage = ({ 
  title, 
  bannerImage, 
  products, 
  brands = [], 
  categoryPath 
}) => {
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFreeShipping, setShowFreeShipping] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Rating options
  const ratings = [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' },
    { value: 1, label: '1★ & above' }
  ];
  
  // Discount options
  const discounts = [
    { value: 50, label: '50% or more' },
    { value: 40, label: '40% or more' },
    { value: 30, label: '30% or more' },
    { value: 20, label: '20% or more' },
    { value: 10, label: '10% or more' }
  ];

  // Handle brand selection
  const handleBrandChange = (event) => {
    const brand = event.target.name;
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  // Handle rating selection
  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.name);
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };
  
  // Handle discount selection
  const handleDiscountChange = (event) => {
    const discount = parseInt(event.target.name);
    if (selectedDiscounts.includes(discount)) {
      setSelectedDiscounts(selectedDiscounts.filter(d => d !== discount));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };
  
  // Apply filters
  const applyFilters = () => {
    // In a real app, this would filter the products based on the selected filters
    console.log('Applying filters:', {
      priceRange,
      selectedBrands,
      selectedRatings,
      selectedDiscounts
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedDiscounts([]);
  };

  return (
    <Layout>
      {/* Page Header */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `linear-gradient(rgba(100, 99, 99, 0.48), rgba(0,0,0,0.4)), url("${bannerImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(247, 240, 240, 1)' }}>
          {title}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>

        {/* Mobile Filter Toggle */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={toggleMobileFilters}
            fullWidth
          >
            Filters
          </Button>
        </Box>

        <Grid container spacing={3}>
          
          {/* Filters Sidebar - moved to the left */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterListIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Filters</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Price Range Filter */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Price Range</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `₹${value}`}
                      min={0}
                      max={100000}
                      sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label="Min (₹)"
                        type="number"
                        size="small"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        sx={{ width: '50%' }}
                      />
                      <TextField
                        label="Max (₹)"
                        type="number"
                        size="small"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        sx={{ width: '50%' }}
                      />
                    </Stack>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CategoryIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Brands</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {brands.map((brand, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={selectedBrands.includes(brand)}
                              onChange={handleBrandChange}
                              name={brand}
                              size="small"
                            />
                          }
                          label={brand}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Rating Filter */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Customer Ratings</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {ratings.map((rating, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectedRatings.includes(rating.value)}
                            onChange={handleRatingChange}
                            name={rating.value.toString()}
                            size="small"
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={rating.value} readOnly size="small" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              & above
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              {/* Discount Filter */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Discount</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {discounts.map((discount, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectedDiscounts.includes(discount.value)}
                            onChange={handleDiscountChange}
                            name={discount.value.toString()}
                            size="small"
                          />
                        }
                        label={discount.label}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              {/* Filter Actions */}
              <Box sx={{ mt: 3 }}>
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={applyFilters}
                    startIcon={<FilterListIcon />}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={resetFilters}
                    startIcon={<ClearIcon />}
                  >
                    Reset All
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Products Grid - moved to the right */}
          <Grid item xs={12} md={9}>
            {/* Products Header */}
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6">
                  Showing {products.length} products
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* View Mode Toggle */}
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                    size="small"
                  >
                    <ToggleButton value="grid">
                      <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ViewListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  
                  {/* Sort Options */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={handleSortChange}
                      label="Sort by"
                      startAdornment={<SortIcon color="action" sx={{ mr: 1 }} />}
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Customer Rating</MenuItem>
                      <MenuItem value="newest">Newest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Paper>

            {/* Products List */}
            <Grid container spacing={3}>
              {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product._id || product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{ display: { md: 'none' } }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Mobile filters content - same as desktop but in drawer */}
        </Box>
      </Drawer>
    </Layout>
  );
};

export default CategoryPage;