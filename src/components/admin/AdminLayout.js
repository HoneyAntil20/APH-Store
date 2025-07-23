import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Button,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
  People,
  Inventory,
  Analytics,
  Logout,
  Search,
  ShoppingBasket,
  AccountCircle
} from '@mui/icons-material';
import '../../styles/admin/AdminLayout.css';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if admin is logged in
  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };
  
  // Get admin data
  const getAdminName = () => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      return adminData?.name || 'Admin User';
    } catch (e) {
      return 'Admin User';
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/admin/orders' },
    { text: 'Products', icon: <Inventory />, path: '/admin/products' },
    { text: 'Customers', icon: <People />, path: '/admin/customers' },
    { text: 'Analytics', icon: <Analytics />, path: '/admin/analytics' },
    { text: 'Cart Management', icon: <ShoppingBasket />, path: '/admin/cart' },
  ];
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Admin Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            APH Store
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Admin Panel
          </Typography>
        </Box>
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'white' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ justifyContent: 'flex-start' }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Admin Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {/* Admin Header */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'white',
            color: 'text.primary',
            boxShadow: 1,
            zIndex: 1,
          }}
        >
          <Toolbar>
            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              sx={{ mr: 2, minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 1 }}>
                <AccountCircle />
              </Avatar>
              <Typography variant="body1">
                {getAdminName()}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: 'background.default',
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;