import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Rating,
  LinearProgress,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const MuiCards = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [liked, setLiked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  // Sample data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviews: 128,
      image: '/api/placeholder/300/200',
      category: 'Electronics',
      inStock: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.2,
      reviews: 89,
      image: '/api/placeholder/300/200',
      category: 'Electronics',
      inStock: true,
      discount: 25
    },
    {
      id: 3,
      name: 'Laptop Bag',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 234,
      image: '/api/placeholder/300/200',
      category: 'Accessories',
      inStock: false,
      discount: 20
    }
  ];

  const statsCards = [
    { title: 'Total Sales', value: '$12,345', change: '+12.5%', trend: 'up', color: 'success' },
    { title: 'Orders', value: '1,234', change: '+8.2%', trend: 'up', color: 'info' },
    { title: 'Customers', value: '5,678', change: '-2.1%', trend: 'down', color: 'error' },
    { title: 'Revenue', value: '$45,678', change: '+15.3%', trend: 'up', color: 'primary' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Cards Collection
      </Typography>

      {/* Basic Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Card
        </Typography>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Basic Card"
            subheader="September 14, 2023"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This is a basic card example with header, content, and actions.
              It demonstrates the standard structure of a Material-UI card component.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => setLiked(!liked)}>
              <FavoriteIcon color={liked ? 'error' : 'inherit'} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Product Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Product Cards
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id || product.id}>
              <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ backgroundColor: '#f5f5f5' }}
                  />
                  {product.discount && (
                    <Chip
                      label={`-${product.discount}%`}
                      color="error"
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    />
                  )}
                  <Badge
                    color={product.inStock ? 'success' : 'error'}
                    variant="dot"
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <IconButton aria-label="view details">
                    <VisibilityIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Stats Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Statistics Cards
        </Typography>
        <Grid container spacing={3}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" component="div">
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        {stat.trend === 'up' ? (
                          <TrendingUpIcon color="success" fontSize="small" />
                        ) : (
                          <TrendingDownIcon color="error" fontSize="small" />
                        )}
                        <Typography
                          variant="body2"
                          color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                          sx={{ ml: 0.5 }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: `${stat.color}.main` }}>
                      {stat.title === 'Total Sales' && <AttachMoneyIcon />}
                      {stat.title === 'Orders' && <AssessmentIcon />}
                      {stat.title === 'Customers' && <PeopleIcon />}
                      {stat.title === 'Revenue' && <TrendingUpIcon />}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Profile Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Card
        </Typography>
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60 }}>
                JD
              </Avatar>
            }
            title="John Doe"
            subheader="Software Engineer"
          />
          <CardContent>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="john.doe@email.com" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="+1 (555) 123-4567" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="New York, NY" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Tech Solutions Inc." />
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button variant="outlined" fullWidth>
              View Profile
            </Button>
          </CardActions>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Progress Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Progress Card
        </Typography>
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Project Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Completed Tasks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  75%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={75} />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Testing Phase
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  45%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={45} color="warning" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">12 Completed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="body2">4 Pending</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interactive Card */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Interactive Shopping Card
        </Typography>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="/api/placeholder/345/140"
            alt="Product"
            sx={{ backgroundColor: '#f5f5f5' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Premium Product
            </Typography>
            <Typography variant="body2" color="text.secondary">
              High-quality product with excellent features and great value for money.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography variant="h6" color="primary">
                $99.99
              </Typography>
              <Rating value={4.5} readOnly size="small" sx={{ ml: 2 }} />
            </Box>
          </CardContent>
          <CardActions>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button variant="contained" sx={{ ml: 'auto' }}>
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default MuiCards;