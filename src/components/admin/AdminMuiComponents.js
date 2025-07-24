import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  Badge,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Link,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  TabPanel,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Dashboard,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  MoreVert,
  Edit,
  Delete,
  Add,
  FilterList,
  Search,
  Notifications,
  Settings,
  Download,
  Upload,
  Refresh,
  Save,
  Cancel,
  Check,
  Close,
  ExpandMore,
  NavigateNext,
  Home,
  Print,
  Share,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Assignment,
  LocalShipping,
  Payment,
  Security,
  Analytics,
  Report,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  BusinessCenter,
  Store,
  Category,
  Group,
  PersonAdd,
  ShoppingBag,
  LocalOffer,
  Star,
  ThumbUp,
  Comment,
  Visibility,
  Warning,
  Info,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';

// 1. Admin Dashboard Cards
export const AdminDashboardCards = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12%',
      trend: 'up',
      icon: <AttachMoney />,
      color: 'success'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: <ShoppingCart />,
      color: 'primary'
    },
    {
      title: 'Customers',
      value: '856',
      change: '+15%',
      trend: 'up',
      icon: <People />,
      color: 'info'
    },
    {
      title: 'Products',
      value: '142',
      change: '-2%',
      trend: 'down',
      icon: <Inventory />,
      color: 'warning'
    }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: `${stat.color}.main`, mr: 2 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h6" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {stat.trend === 'up' ? (
                <TrendingUp color="success" />
              ) : (
                <TrendingDown color="error" />
              )}
              <Typography 
                variant="body2" 
                color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                sx={{ ml: 1 }}
              >
                {stat.change}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// 2. Admin Data Table
export const AdminDataTable = ({ title, data, columns, actions = true }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Box>
          <Button variant="outlined" startIcon={<FilterList />} sx={{ mr: 1 }}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Add New
          </Button>
        </Box>
      </Box>
      
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              {actions && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof row[column.id] === 'number'
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, row)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

// 3. Admin Order Management
export const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      total: 299.99,
      status: 'pending',
      date: '2024-01-15',
      items: 3
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      total: 159.99,
      status: 'shipped',
      date: '2024-01-14',
      items: 2
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      total: 89.99,
      status: 'delivered',
      date: '2024-01-13',
      items: 1
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Order Management
      </Typography>
      
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{order.id}</Typography>
                  <Chip 
                    label={order.status.toUpperCase()} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Customer: {order.customer}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total: ${order.total}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Items: {order.items}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Date: {order.date}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={order.status}
                      label="Status"
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// 4. Admin Product Management
export const AdminProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      stock: 50,
      category: 'Electronics',
      status: 'active'
    },
    {
      id: 2,
      name: 'Running Shoes',
      price: 79.99,
      stock: 25,
      category: 'Sports',
      status: 'active'
    },
    {
      id: 3,
      name: 'Coffee Maker',
      price: 129.99,
      stock: 0,
      category: 'Appliances',
      status: 'inactive'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      price: '',
      stock: '',
      category: '',
      status: 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Appliances">Appliances</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Product Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => {
            setSelectedProduct(null);
            setOpenDialog(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.stock} 
                    color={product.stock > 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.status} 
                    color={product.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            product={selectedProduct}
            onSave={(data) => {
              if (selectedProduct) {
                setProducts(products.map(p => 
                  p.id === selectedProduct.id ? { ...data, id: selectedProduct.id } : p
                ));
              } else {
                setProducts([...products, { ...data, id: Date.now() }]);
              }
              setOpenDialog(false);
            }}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// 5. Admin Analytics Components
export const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [showDetails, setShowDetails] = useState(false);

  const analyticsData = {
    revenue: {
      current: 12345,
      previous: 11200,
      growth: '+10.2%'
    },
    orders: {
      current: 156,
      previous: 134,
      growth: '+16.4%'
    },
    customers: {
      current: 89,
      previous: 76,
      growth: '+17.1%'
    },
    conversion: {
      current: 2.4,
      previous: 2.1,
      growth: '+14.3%'
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Analytics Dashboard</Typography>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(e, value) => setTimeRange(value)}
          size="small"
        >
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoney color="primary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Revenue
                </Typography>
              </Box>
              <Typography variant="h4">
                ${analyticsData.revenue.current.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.revenue.growth} from last {timeRange}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShoppingCart color="info" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Orders
                </Typography>
              </Box>
              <Typography variant="h4">
                {analyticsData.orders.current}
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.orders.growth} from last {timeRange}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People color="warning" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Customers
                </Typography>
              </Box>
              <Typography variant="h4">
                {analyticsData.customers.current}
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.customers.growth} from last {timeRange}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="success" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Conversion
                </Typography>
              </Box>
              <Typography variant="h4">
                {analyticsData.conversion.current}%
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.conversion.growth} from last {timeRange}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button 
          variant="outlined" 
          onClick={() => setShowDetails(!showDetails)}
          startIcon={<Analytics />}
        >
          {showDetails ? 'Hide' : 'Show'} Detailed Analytics
        </Button>
      </Box>

      {showDetails && (
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Additional charts and detailed metrics would be displayed here.
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

// 6. Admin Notification System
export const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-001 from John Doe',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Headphones" has only 5 items left',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'customer',
      title: 'New Customer Registration',
      message: 'Jane Smith has registered as a new customer',
      time: '3 hours ago',
      read: true
    }
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart />;
      case 'stock': return <Warning />;
      case 'customer': return <PersonAdd />;
      default: return <Info />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setSnackbarMessage('Notification marked as read');
    setOpenSnackbar(true);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Notifications
        </Typography>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                bgcolor: notification.read ? 'transparent' : 'action.hover',
                cursor: 'pointer'
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notification.message}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </React.Fragment>
                }
              />
              {!notification.read && (
                <Chip label="New" color="primary" size="small" />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

// 7. Admin Settings Panel
export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'APH Store',
    email: 'admin@aphstore.com',
    currency: 'USD',
    timezone: 'UTC',
    notifications: true,
    autoBackup: true,
    maintenanceMode: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Admin Email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>System Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                }
                label="Enable email notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  />
                }
                label="Enable automatic backups"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  />
                }
                label="Maintenance mode"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          onClick={handleSave}
          startIcon={<Save />}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

// Main Admin Components Showcase
export const AdminComponentsShowcase = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { label: 'Dashboard', component: <AdminDashboardCards /> },
    { label: 'Orders', component: <AdminOrderManagement /> },
    { label: 'Products', component: <AdminProductManagement /> },
    { label: 'Analytics', component: <AdminAnalytics /> },
    { label: 'Notifications', component: <AdminNotifications /> },
    { label: 'Settings', component: <AdminSettings /> }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Admin Components
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        {tabs[selectedTab].component}
      </Box>
    </Box>
  );
};
