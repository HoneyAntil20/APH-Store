import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Box,
  Avatar,
  Divider,
  IconButton,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import {
  Search,
  ExpandMore,
  Star,
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  FilterList,
  Clear,
  Category,
  AttachMoney,
  LocalOffer,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';

// 1. Custom Buttons Component
export const CustomButtons = () => {
  return (
    <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary Button
      </Button>
      <Button variant="text" color="success">
        Text Button
      </Button>
      <Button variant="contained" color="error" size="small">
        Small Button
      </Button>
      <Button variant="contained" color="warning" size="large">
        Large Button
      </Button>
      <Button variant="contained" startIcon={<Person />}>
        With Icon
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
    </Box>
  );
};

// 2. Custom Lists Component
export const CustomLists = () => {
  const listItems = [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'J' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'J' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: 'B' },
  ];

  return (
    <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {listItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{item.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.email}
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < listItems.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

// 3. Custom Cards Component
export const CustomCards = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Product Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a sample product description. It provides details about the product features and benefits.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                (4.5)
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
            <Button size="small" color="secondary">
              Learn More
            </Button>
            <IconButton
              onClick={() => setFavorite(!favorite)}
              color="error"
              sx={{ ml: 'auto' }}
            >
              {favorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

// 4. Custom Search Bar Component
export const CustomSearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products, categories, or brands..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setSearchValue('')}
                edge="end"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

// 5. Custom Accordion Component
export const CustomAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Users
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

// 6. Custom Tabs Component
export const CustomTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
          <Tab label="Products" />
          <Tab label="Orders" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Overview content - Dashboard summary and key metrics
      </TabPanel>
      <TabPanel value={value} index={1}>
        Products content - Product management and inventory
      </TabPanel>
      <TabPanel value={value} index={2}>
        Orders content - Order management and tracking
      </TabPanel>
      <TabPanel value={value} index={3}>
        Analytics content - Charts and reports
      </TabPanel>
    </Box>
  );
};

// 7. Sign Up Form Component
export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up form submitted:', formData);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
              }
              label="I agree to the Terms of Service and Privacy Policy"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

// 8. Login Form Component
export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button variant="text" color="primary">
              Forgot Password?
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

// 9. Filters Component
export const FiltersComponent = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    onSale: false
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      onSale: false
    });
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys'
  ];

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <FilterList />
          <Typography variant="h6">Filters</Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenDialog(true)}
          >
            Advanced Filters
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={handleClearFilters}
            startIcon={<Clear />}
          >
            Clear All
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.category && (
            <Chip
              label={`Category: ${filters.category}`}
              onDelete={() => handleFilterChange('category', '')}
              color="primary"
            />
          )}
          {filters.rating > 0 && (
            <Chip
              label={`Rating: ${filters.rating}+ stars`}
              onDelete={() => handleFilterChange('rating', 0)}
              color="primary"
            />
          )}
          {filters.inStock && (
            <Chip
              label="In Stock"
              onDelete={() => handleFilterChange('inStock', false)}
              color="primary"
            />
          )}
          {filters.onSale && (
            <Chip
              label="On Sale"
              onDelete={() => handleFilterChange('onSale', false)}
              color="primary"
            />
          )}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Advanced Filters</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={filters.priceRange}
                onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={10}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">${filters.priceRange[0]}</Typography>
                <Typography variant="body2">${filters.priceRange[1]}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>Minimum Rating</Typography>
              <Rating
                value={filters.rating}
                onChange={(e, newValue) => handleFilterChange('rating', newValue)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                }
                label="In Stock Only"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  />
                }
                label="On Sale"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Main demo component to showcase all components
export const MaterialUIShowcase = () => {
  const [selectedComponent, setSelectedComponent] = useState(0);

  const components = [
    { name: 'Buttons', component: <CustomButtons /> },
    { name: 'Lists', component: <CustomLists /> },
    { name: 'Cards', component: <CustomCards /> },
    { name: 'Search Bar', component: <CustomSearchBar /> },
    { name: 'Accordion', component: <CustomAccordion /> },
    { name: 'Tabs', component: <CustomTabs /> },
    { name: 'Sign Up Form', component: <SignUpForm /> },
    { name: 'Login Form', component: <LoginForm /> },
    { name: 'Filters', component: <FiltersComponent /> },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Material UI Components Showcase
      </Typography>
      
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={selectedComponent}
          onChange={(e, newValue) => setSelectedComponent(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {components.map((comp, index) => (
            <Tab key={index} label={comp.name} />
          ))}
        </Tabs>
      </Paper>
      
      <Box sx={{ mt: 2 }}>
        {components[selectedComponent].component}
      </Box>
    </Box>
  );
};