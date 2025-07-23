import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  Divider,
  Paper,
  Grid
} from '@mui/material';
import { 
  Login, 
  Logout, 
  PersonAdd, 
  AdminPanelSettings,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

const AuthDemo = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [demoCredentials, setDemoCredentials] = useState({
    email: 'demo@example.com',
    password: 'demo123'
  });
  const [adminCredentials, setAdminCredentials] = useState({
    email: 'admin@aphstore.com',
    password: 'admin123'
  });

  const handleDemoLogin = () => {
    const userData = {
      id: 1,
      name: 'Demo User',
      email: demoCredentials.email,
      isAdmin: false
    };
    login(userData);
  };

  const handleAdminLogin = () => {
    const adminData = {
      id: 1,
      name: 'Admin User',
      email: adminCredentials.email,
      isAdmin: true
    };
    login(adminData);
  };

  const handleLogout = () => {
    logout();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page-container">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Authentication Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Test the authentication system with demo accounts
        </Typography>

        {/* Current Auth Status */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Current Authentication Status
          </Typography>
          {isAuthenticated ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Logged in as:</strong> {user?.name} ({user?.email})
              </Typography>
              <Typography variant="body2">
                <strong>Role:</strong> {user?.isAdmin ? 'Administrator' : 'Regular User'}
              </Typography>
            </Alert>
          ) : (
            <Alert severity="info">
              You are currently not logged in
            </Alert>
          )}
          
          {isAuthenticated && (
            <Button
              variant="contained"
              color="error"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          )}
        </Paper>

        <Grid container spacing={4}>
          {/* Demo User Login */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  <PersonAdd sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Demo User Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Login with a regular user account to test user features
                </Typography>
                
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={demoCredentials.email}
                  onChange={(e) => setDemoCredentials({
                    ...demoCredentials,
                    email: e.target.value
                  })}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={demoCredentials.password}
                  onChange={(e) => setDemoCredentials({
                    ...demoCredentials,
                    password: e.target.value
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<Login />}
                  onClick={handleDemoLogin}
                  disabled={isAuthenticated}
                >
                  Login as Demo User
                </Button>
                
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    <strong>Demo User Features:</strong><br />
                    • Browse products<br />
                    • Add items to cart<br />
                    • View profile<br />
                    • Place orders
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Admin Login */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="secondary">
                  <AdminPanelSettings sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Admin Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Login with an admin account to test administrative features
                </Typography>
                
                <TextField
                  fullWidth
                  label="Admin Email"
                  type="email"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials({
                    ...adminCredentials,
                    email: e.target.value
                  })}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Admin Password"
                  type={showPassword ? 'text' : 'password'}
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({
                    ...adminCredentials,
                    password: e.target.value
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<AdminPanelSettings />}
                  onClick={handleAdminLogin}
                  disabled={isAuthenticated}
                >
                  Login as Admin
                </Button>
                
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    <strong>Admin Features:</strong><br />
                    • Manage products<br />
                    • View orders<br />
                    • Customer management<br />
                    • Analytics dashboard
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Instructions */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            How to Use This Demo
          </Typography>
          <Typography variant="body1" paragraph>
            1. <strong>Choose an account type:</strong> Select either the demo user or admin account to test different features.
          </Typography>
          <Typography variant="body1" paragraph>
            2. <strong>Login:</strong> Click the login button for your chosen account type. The credentials are pre-filled for convenience.
          </Typography>
          <Typography variant="body1" paragraph>
            3. <strong>Explore:</strong> Navigate through the application to see how different features work based on your user role.
          </Typography>
          <Typography variant="body1" paragraph>
            4. <strong>Logout:</strong> Use the logout button above to clear your session and try a different account type.
          </Typography>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Note:</strong> This is a demo environment. All data is stored locally and will be reset when you refresh the page.
            </Typography>
          </Alert>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default AuthDemo;