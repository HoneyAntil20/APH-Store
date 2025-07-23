import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  Divider,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Rating,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Drawer,
  AppBar,
  Toolbar,
  Fab
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
  Star as StarIcon,
  AttachMoney as AttachMoneyIcon,
  Category as CategoryIcon,
  Palette as PaletteIcon,
  LocalOffer as LocalOfferIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Bookmark as BookmarksIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Tune as TuneIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ThumbUp as ThumbUpIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  CameraAlt as CameraIcon,
  BatteryFull as BatteryIcon,
  Bluetooth as BluetoothIcon,
  Wifi as WifiIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Computer as LaptopIcon,
  Watch as WatchIcon,
  Headset as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Monitor as MonitorIcon,
  Tablet as TabletIcon,
  PhotoCamera as CameraAltIcon,
  Videocam as VideocamIcon,
  Extension as ExtensionIcon
} from '@mui/icons-material';

const MuiFilterSlider = () => {
  const [priceRange, setPriceRange] = React.useState([20, 80]);
  const [ageRange, setAgeRange] = React.useState([18, 65]);
  const [experienceLevel, setExperienceLevel] = React.useState(3);
  const [rating, setRating] = React.useState(4);
  const [discountRange, setDiscountRange] = React.useState([0, 50]);
  const [categories, setCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [condition, setCondition] = React.useState('');
  const [availability, setAvailability] = React.useState('');
  const [sortBy, setSortBy] = React.useState('relevance');
  const [viewMode, setViewMode] = React.useState('grid');
  const [location, setLocation] = React.useState('');
  const [dateRange, setDateRange] = React.useState([1, 30]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState('price');
  const [savedFilters, setSavedFilters] = React.useState([]);
  const [activeFilters, setActiveFilters] = React.useState([]);

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics', icon: <PhoneAndroidIcon /> },
    { value: 'clothing', label: 'Clothing', icon: <PersonIcon /> },
    { value: 'books', label: 'Books', icon: <SchoolIcon /> },
    { value: 'home', label: 'Home & Garden', icon: <HomeIcon /> },
    { value: 'sports', label: 'Sports', icon: <FavoriteIcon /> },
    { value: 'beauty', label: 'Beauty', icon: <PaletteIcon /> },
    { value: 'automotive', label: 'Automotive', icon: <LocalShippingIcon /> },
    { value: 'toys', label: 'Toys & Games', icon: <ExtensionIcon /> }
  ];

  const brandOptions = [
    'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Microsoft', 'Google', 'Dell', 'HP', 'Canon'
  ];

  const colorOptions = [
    { value: 'red', label: 'Red', color: '#f44336' },
    { value: 'blue', label: 'Blue', color: '#2196f3' },
    { value: 'green', label: 'Green', color: '#4caf50' },
    { value: 'yellow', label: 'Yellow', color: '#ffeb3b' },
    { value: 'orange', label: 'Orange', color: '#ff9800' },
    { value: 'purple', label: 'Purple', color: '#9c27b0' },
    { value: 'black', label: 'Black', color: '#000000' },
    { value: 'white', label: 'White', color: '#ffffff' }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const featureOptions = [
    'Free Shipping', 'Prime Eligible', 'On Sale', 'New Arrivals', 'Best Seller', 'Eco-Friendly', 'Handmade', 'Vintage'
  ];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    updateActiveFilters('price', `$${newValue[0]} - $${newValue[1]}`);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const newCategories = event.target.checked
      ? [...categories, value]
      : categories.filter(cat => cat !== value);
    setCategories(newCategories);
    updateActiveFilters('categories', newCategories);
  };

  const handleBrandChange = (event, newValue) => {
    setBrands(newValue);
    updateActiveFilters('brands', newValue);
  };

  const handleColorChange = (color) => {
    const newColors = colors.includes(color)
      ? colors.filter(c => c !== color)
      : [...colors, color];
    setColors(newColors);
    updateActiveFilters('colors', newColors);
  };

  const handleSizeChange = (size) => {
    const newSizes = sizes.includes(size)
      ? sizes.filter(s => s !== size)
      : [...sizes, size];
    setSizes(newSizes);
    updateActiveFilters('sizes', newSizes);
  };

  const handleFeatureChange = (feature) => {
    const newFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    setFeatures(newFeatures);
    updateActiveFilters('features', newFeatures);
  };

  const updateActiveFilters = (type, value) => {
    const newActiveFilters = activeFilters.filter(filter => filter.type !== type);
    if (value && (Array.isArray(value) ? value.length > 0 : value)) {
      newActiveFilters.push({ type, value });
    }
    setActiveFilters(newActiveFilters);
  };

  const clearAllFilters = () => {
    setPriceRange([20, 80]);
    setAgeRange([18, 65]);
    setExperienceLevel(3);
    setRating(4);
    setDiscountRange([0, 50]);
    setCategories([]);
    setBrands([]);
    setColors([]);
    setSizes([]);
    setFeatures([]);
    setCondition('');
    setAvailability('');
    setSortBy('relevance');
    setLocation('');
    setDateRange([1, 30]);
    setActiveFilters([]);
  };

  const saveCurrentFilters = () => {
    const filterSet = {
      id: Date.now(),
      name: `Filter Set ${savedFilters.length + 1}`,
      filters: {
        priceRange,
        categories,
        brands,
        colors,
        sizes,
        features,
        condition,
        availability,
        rating,
        discountRange
      }
    };
    setSavedFilters([...savedFilters, filterSet]);
  };

  const loadSavedFilter = (filterSet) => {
    const { filters } = filterSet;
    setPriceRange(filters.priceRange);
    setCategories(filters.categories);
    setBrands(filters.brands);
    setColors(filters.colors);
    setSizes(filters.sizes);
    setFeatures(filters.features);
    setCondition(filters.condition);
    setAvailability(filters.availability);
    setRating(filters.rating);
    setDiscountRange(filters.discountRange);
  };

  const filterSections = [
    {
      id: 'price',
      title: 'Price Range',
      icon: <AttachMoneyIcon />,
      content: (
        <Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={10}
            marks={[
              { value: 0, label: '$0' },
              { value: 250, label: '$250' },
              { value: 500, label: '$500' },
              { value: 750, label: '$750' },
              { value: 1000, label: '$1000' }
            ]}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              size="small"
              label="Min"
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              sx={{ width: '100px' }}
            />
            <TextField
              size="small"
              label="Max"
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              sx={{ width: '100px' }}
            />
          </Box>
        </Box>
      )
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: <CategoryIcon />,
      content: (
        <FormGroup>
          {categoryOptions.map((category) => (
            <FormControlLabel
              key={category.value}
              control={
                <Checkbox
                  checked={categories.includes(category.value)}
                  onChange={handleCategoryChange}
                  value={category.value}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  {category.label}
                </Box>
              }
            />
          ))}
        </FormGroup>
      )
    },
    {
      id: 'brands',
      title: 'Brands',
      icon: <BusinessIcon />,
      content: (
        <Autocomplete
          multiple
          options={brandOptions}
          value={brands}
          onChange={handleBrandChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select brands"
              size="small"
            />
          )}
        />
      )
    },
    {
      id: 'colors',
      title: 'Colors',
      icon: <PaletteIcon />,
      content: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {colorOptions.map((color) => (
            <IconButton
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              sx={{
                bgcolor: color.color,
                border: colors.includes(color.value) ? '2px solid #000' : '1px solid #ccc',
                '&:hover': { bgcolor: color.color, opacity: 0.8 }
              }}
            >
              {colors.includes(color.value) && <CheckIcon sx={{ color: color.color === '#ffffff' ? '#000' : '#fff' }} />}
            </IconButton>
          ))}
        </Box>
      )
    },
    {
      id: 'sizes',
      title: 'Sizes',
      icon: <TuneIcon />,
      content: (
        <ToggleButtonGroup
          value={sizes}
          onChange={(event, newSizes) => setSizes(newSizes)}
          aria-label="sizes"
          sx={{ flexWrap: 'wrap' }}
        >
          {sizeOptions.map((size) => (
            <ToggleButton key={size} value={size} aria-label={size}>
              {size}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )
    },
    {
      id: 'rating',
      title: 'Customer Rating',
      icon: <StarIcon />,
      content: (
        <Box>
          <Typography gutterBottom>
            {rating} stars & up
          </Typography>
          <Slider
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            min={1}
            max={5}
            step={1}
            marks={[
              { value: 1, label: '1★' },
              { value: 2, label: '2★' },
              { value: 3, label: '3★' },
              { value: 4, label: '4★' },
              { value: 5, label: '5★' }
            ]}
          />
        </Box>
      )
    },
    {
      id: 'features',
      title: 'Features',
      icon: <VerifiedIcon />,
      content: (
        <Stack spacing={1}>
          {featureOptions.map((feature) => (
            <Chip
              key={feature}
              label={feature}
              clickable
              color={features.includes(feature) ? 'primary' : 'default'}
              onClick={() => handleFeatureChange(feature)}
              variant={features.includes(feature) ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
      )
    },
    {
      id: 'discount',
      title: 'Discount Range',
      icon: <LocalOfferIcon />,
      content: (
        <Box>
          <Typography gutterBottom>
            {discountRange[0]}% - {discountRange[1]}% off
          </Typography>
          <Slider
            value={discountRange}
            onChange={(event, newValue) => setDiscountRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={80}
            step={5}
            marks={[
              { value: 0, label: '0%' },
              { value: 20, label: '20%' },
              { value: 40, label: '40%' },
              { value: 60, label: '60%' },
              { value: 80, label: '80%' }
            ]}
          />
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Filter Slider Collection
      </Typography>

      {/* Advanced Product Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Advanced Product Filter
        </Typography>
        <Grid container spacing={3}>
          {/* Filter Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <FilterListIcon sx={{ mr: 1 }} />
                  Filters
                </Typography>
                <Box>
                  <IconButton onClick={saveCurrentFilters} size="small">
                    <BookmarksIcon />
                  </IconButton>
                  <IconButton onClick={clearAllFilters} size="small">
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Active Filters:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {activeFilters.map((filter, index) => (
                      <Chip
                        key={index}
                        label={`${filter.type}: ${Array.isArray(filter.value) ? filter.value.join(', ') : filter.value}`}
                        onDelete={() => {
                          const newActiveFilters = activeFilters.filter((_, i) => i !== index);
                          setActiveFilters(newActiveFilters);
                        }}
                        size="small"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Filter Sections */}
              {filterSections.map((section) => (
                <Accordion
                  key={section.id}
                  expanded={expandedSection === section.id}
                  onChange={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {section.icon}
                      <Typography>{section.title}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {section.content}
                  </AccordionDetails>
                </Accordion>
              ))}

              {/* Saved Filters */}
              {savedFilters.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Saved Filters:
                  </Typography>
                  <List dense>
                    {savedFilters.map((filterSet) => (
                      <ListItem
                        key={filterSet.id}
                        button
                        onClick={() => loadSavedFilter(filterSet)}
                      >
                        <ListItemIcon>
                          <BookmarksIcon />
                        </ListItemIcon>
                        <ListItemText primary={filterSet.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Results Area */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Results ({Math.floor(Math.random() * 1000) + 100})
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort by"
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Customer Rating</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                    </Select>
                  </FormControl>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newView) => newView && setViewMode(newView)}
                    size="small"
                  >
                    <ToggleButton value="grid">
                      <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ViewListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Results will be displayed here based on your filter selections.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Simple Price Range Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Simple Price Range Filter
        </Typography>
        <Card sx={{ p: 3, maxWidth: 600 }}>
          <Typography variant="subtitle1" gutterBottom>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={10}
            color="primary"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">$0</Typography>
            <Typography variant="body2">$1000</Typography>
          </Box>
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Age Range Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Age Range Filter
        </Typography>
        <Card sx={{ p: 3, maxWidth: 600 }}>
          <Typography variant="subtitle1" gutterBottom>
            Age Range: {ageRange[0]} - {ageRange[1]} years
          </Typography>
          <Slider
            value={ageRange}
            onChange={(event, newValue) => setAgeRange(newValue)}
            valueLabelDisplay="auto"
            min={18}
            max={100}
            step={1}
            color="secondary"
            marks={[
              { value: 18, label: '18' },
              { value: 30, label: '30' },
              { value: 50, label: '50' },
              { value: 65, label: '65' },
              { value: 100, label: '100+' }
            ]}
          />
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Experience Level Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Experience Level Filter
        </Typography>
        <Card sx={{ p: 3, maxWidth: 600 }}>
          <Typography variant="subtitle1" gutterBottom>
            Experience Level: {experienceLevel} years
          </Typography>
          <Slider
            value={experienceLevel}
            onChange={(event, newValue) => setExperienceLevel(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={20}
            step={1}
            color="success"
            marks={[
              { value: 0, label: 'Beginner' },
              { value: 5, label: '5 years' },
              { value: 10, label: '10 years' },
              { value: 15, label: '15 years' },
              { value: 20, label: 'Expert' }
            ]}
          />
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Mobile Filter Drawer */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Mobile Filter Drawer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setDrawerOpen(true)}
          >
            Show Filters
          </Button>
          <Chip label={`${activeFilters.length} active`} color="primary" />
        </Box>

        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { maxHeight: '80vh', borderTopLeftRadius: 16, borderTopRightRadius: 16 }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Rating: {rating} stars & up
                </Typography>
                <Slider
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  min={1}
                  max={5}
                  step={1}
                  marks={[
                    { value: 1, label: '1★' },
                    { value: 2, label: '2★' },
                    { value: 3, label: '3★' },
                    { value: 4, label: '4★' },
                    { value: 5, label: '5★' }
                  ]}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={clearAllFilters}
                  startIcon={<ClearIcon />}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setDrawerOpen(false)}
                  startIcon={<CheckIcon />}
                >
                  Apply Filters
                </Button>
              </Box>
            </Stack>
          </Box>
        </Drawer>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Vertical Range Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Vertical Range Slider
        </Typography>
        <Card sx={{ p: 3, maxWidth: 300, height: 400 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Temperature Range
          </Typography>
          <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
            <Slider
              orientation="vertical"
              value={[20, 80]}
              onChange={(event, newValue) => console.log(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={1}
              marks={[
                { value: 0, label: '0°C' },
                { value: 25, label: '25°C' },
                { value: 50, label: '50°C' },
                { value: 75, label: '75°C' },
                { value: 100, label: '100°C' }
              ]}
            />
          </Box>
        </Card>
      </Box>

      {/* Floating Action Button for Quick Filters */}
      <Fab
        color="primary"
        aria-label="filters"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setDrawerOpen(true)}
      >
        <TuneIcon />
      </Fab>
    </Box>
  );
};

export default MuiFilterSlider;