import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Stack,
  Card,
  CardContent,
  Autocomplete,
  Avatar,
  Badge,
  Fade,
  ClickAwayListener,
  Popper
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  PersonSearch as PersonSearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';

const MuiSearchBar = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [advancedSearchValue, setAdvancedSearchValue] = React.useState('');
  const [autocompleteValue, setAutocompleteValue] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [recentSearches, setRecentSearches] = React.useState([
    'Wireless Headphones',
    'Laptop Backpack',
    'Smart Watch',
    'Bluetooth Speaker',
    'Gaming Mouse'
  ]);

  const popularSearches = [
    'Best Sellers',
    'New Arrivals',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys & Games'
  ];

  const productSuggestions = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$199' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: '$299' },
    { id: 3, name: 'Laptop Bag', category: 'Accessories', price: '$79' },
    { id: 4, name: 'Bluetooth Speaker', category: 'Electronics', price: '$149' },
    { id: 5, name: 'Gaming Mouse', category: 'Electronics', price: '$89' }
  ];

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [searchValue, ...prev.filter(item => item !== searchValue)];
        return updated.slice(0, 5);
      });
      console.log('Searching for:', searchValue);
      setShowSuggestions(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  const handleRemoveRecentSearch = (searchToRemove) => {
    setRecentSearches(prev => prev.filter(item => item !== searchToRemove));
  };

  const filteredSuggestions = productSuggestions.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const autocompleteSuggestions = [
    'Wireless Headphones',
    'Bluetooth Speaker',
    'Smart Watch',
    'Gaming Mouse',
    'Laptop Bag',
    'Phone Case',
    'Tablet Stand',
    'Keyboard',
    'Monitor',
    'Webcam'
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Search Bar Collection
      </Typography>

      {/* Basic Search Bar */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Search Bar
        </Typography>
        <Paper
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600
          }}
        >
          <TextField
            placeholder="Search products..."
            value={searchValue}
            onChange={handleSearchChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Search with Suggestions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search with Suggestions
        </Typography>
        <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
          <Box sx={{ position: 'relative', maxWidth: 600 }}>
            <TextField
              fullWidth
              placeholder="Search for products, brands, or categories..."
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchValue.length > 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            {showSuggestions && (
              <Fade in={showSuggestions}>
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    maxHeight: 400,
                    overflow: 'auto',
                    mt: 1
                  }}
                >
                  {searchValue && filteredSuggestions.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                        Products
                      </Typography>
                      {filteredSuggestions.map((product) => (
                        <ListItem
                          key={product._id || product.id}
                          button
                          onClick={() => handleSuggestionClick(product.name)}
                        >
                          <ListItemIcon>
                            <ShoppingCartIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={product.name}
                            secondary={`${product.category} • ${product.price}`}
                          />
                        </ListItem>
                      ))}
                      <Divider />
                    </>
                  )}
                  
                  {recentSearches.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                        Recent Searches
                      </Typography>
                      {recentSearches.map((search, index) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => handleSuggestionClick(search)}
                        >
                          <ListItemIcon>
                            <HistoryIcon />
                          </ListItemIcon>
                          <ListItemText primary={search} />
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveRecentSearch(search);
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </ListItem>
                      ))}
                      <Divider />
                    </>
                  )}
                  
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                    Popular Searches
                  </Typography>
                  {popularSearches.slice(0, 5).map((search, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <ListItemIcon>
                        <TrendingUpIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </Paper>
              </Fade>
            )}
          </Box>
        </ClickAwayListener>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Advanced Search */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Advanced Search
        </Typography>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Search Term"
                placeholder="Enter product name or keyword"
                value={advancedSearchValue}
                onChange={(e) => setAdvancedSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Category"
                  select
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 150 }}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                  <option value="books">Books</option>
                </TextField>
                
                <TextField
                  label="Price Range"
                  select
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 150 }}
                >
                  <option value="">Any Price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-500">$100 - $500</option>
                  <option value="500+">$500+</option>
                </TextField>
                
                <TextField
                  label="Brand"
                  placeholder="Enter brand name"
                  sx={{ minWidth: 150 }}
                />
              </Stack>
              
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Popular filters:
                </Typography>
                <Chip label="Free Shipping" size="small" clickable />
                <Chip label="In Stock" size="small" clickable />
                <Chip label="On Sale" size="small" clickable />
                <Chip label="High Rated" size="small" clickable />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Autocomplete Search */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Autocomplete Search
        </Typography>
        <Autocomplete
          options={autocompleteSuggestions}
          value={autocompleteValue}
          onChange={(event, newValue) => setAutocompleteValue(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Products"
              placeholder="Type to search..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                <StoreIcon />
              </Avatar>
              {option}
            </Box>
          )}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Search with Filters */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search with Filters
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, maxWidth: 600 }}>
            <TextField
              fullWidth
              placeholder="Search anything..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <IconButton
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip
              icon={<CategoryIcon />}
              label="Electronics"
              clickable
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<LocalOfferIcon />}
              label="Under $100"
              clickable
              color="secondary"
              variant="outlined"
            />
            <Chip
              label="Free Shipping"
              clickable
              color="success"
              variant="outlined"
            />
            <Chip
              label="4+ Stars"
              clickable
              color="warning"
              variant="outlined"
            />
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Compact Search */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Compact Search
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Quick search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 250 }}
          />
          
          <Badge badgeContent={3} color="primary">
            <IconButton size="small">
              <PersonSearchIcon />
            </IconButton>
          </Badge>
          
          <Typography variant="body2" color="text.secondary">
            Recent: 
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Phones" size="small" clickable />
            <Chip label="Laptops" size="small" clickable />
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Voice Search */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Voice Search (UI Example)
        </Typography>
        <TextField
          fullWidth
          placeholder="Try voice search..."
          sx={{ maxWidth: 600 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary">
                  <Box
                    component="span"
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem'
                    }}
                  >
                    🎤
                  </Box>
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default MuiSearchBar;