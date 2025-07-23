import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/PageTransitions.css';
import usePageTransition from '../hooks/usePageTransition';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
  Avatar,
  CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
  Security as SecurityIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { login, register, isAuthenticated } = useAuth();
  const { isLoading, navigateWithTransition, handleTransition } = usePageTransition();
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigateWithTransition('/home');
    }
  }, [isAuthenticated, navigateWithTransition]);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  // Handle login form input change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle registration form input change
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    
    try {
      // Clear previous error
      setLoginError('');
      
      // Check if both email and password are provided
      if (!loginData.email || !loginData.password) {
        setLoginError('Please enter both email and password');
        return;
      }
      
      // First check registrationsJson for more consistent data
      const registrationsJson = localStorage.getItem('registrationsJson');
      let foundUser = null;
      
      if (registrationsJson) {
        const registrations = JSON.parse(registrationsJson);
        foundUser = registrations.registrations.find(reg => reg.email === loginData.email);
        
        if (foundUser && foundUser.password === loginData.password) {
          // Login successful - create user data object
          const userData = {
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phoneNumber,
            joinDate: new Date(foundUser.registrationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            avatar: '/assets/images/avatar.png' // Default avatar
          };
          
          // Use the login function from AuthContext with transition
          handleTransition(() => {
            login(userData);
            console.log('User logged in successfully from registrations.json, redirecting to home page');
            navigateWithTransition('/home');
          });
          return;
        }
      }
      
      // If not found in registrationsJson, check registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(user => user.email === loginData.email);
      
      if (!user) {
        // If not found in localStorage, check if it's one of the demo users from users.json
        // In a real app, this would be an API call to the server
        if (loginData.email === "john.doe@example.com" && loginData.password === "hashedPassword123") {
          // Demo user login for testing
          const demoUserData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (123) 456-7890",
            joinDate: "January 15, 2023",
            avatar: '/assets/images/avatar.png'
          };
          
          // Use the login function from AuthContext with transition
          handleTransition(() => {
            login(demoUserData);
            console.log('Demo user logged in successfully');
            navigateWithTransition('/home');
          });
          return;
        }
        
        setLoginError('No account found with this email. Please register first.');
        return;
      }
      
      // Check if password matches
      if (user.password !== loginData.password) {
        setLoginError('Incorrect password. Please try again.');
        return;
      }
      
      // Login successful - create user data object
      const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        joinDate: user.joinDate,
        avatar: '/assets/images/avatar.png' // Default avatar
      };
      
      // Use the login function from AuthContext with transition
      handleTransition(() => {
        login(userData);
        console.log('User logged in successfully, redirecting to home page');
        navigateWithTransition('/home');
      });
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('There was an error during login. Please try again.');
    }
  };
  
  // Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
    
    // Clear previous error
    setRegisterError('');
    
    // Check if all required fields are filled
    if (!registerData.firstName || !registerData.lastName || !registerData.email || 
        !registerData.phone || !registerData.password || !registerData.confirmPassword) {
      setRegisterError('Please fill in all required fields');
      return;
    }
    
    // Check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match!');
      return;
    }
    
    // Check if terms are agreed to
    if (!registerData.agreeTerms) {
      setRegisterError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    // Check if email is already registered
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (registeredUsers.some(user => user.email === registerData.email)) {
      setRegisterError('This email is already registered. Please use a different email or login.');
      return;
    }
    
    // Create user data object
    const fullName = `${registerData.firstName} ${registerData.lastName}`;
    const joinDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const registrationDate = new Date().toISOString();
    
    // Create user data for registration
    const newUser = {
      name: fullName,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password,
      joinDate: joinDate,
      registrationDate: registrationDate
    };
    
    // Create user data for profile
    const userData = {
      name: fullName,
      email: registerData.email,
      phone: registerData.phone,
      joinDate: joinDate,
      avatar: '/assets/images/avatar.png' // Default avatar
    };
    
    try {
      // Also update registeredUsers in localStorage for consistency
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Use the register function from AuthContext with transition
      handleTransition(() => {
        register(newUser);
        login(userData); // Auto-login after registration
        
        // Log registration data for debugging
        console.log('User registered successfully:', userData);
        
        // Redirect to home page after successful registration
        navigateWithTransition('/home');
      });
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('There was an error during registration. Please try again.');
    }
  };
  
  // Handle admin login
  const handleAdminLogin = () => {
    // Redirect to admin login page
    navigateWithTransition('/admin/login');
  };
  
  // We're now using the usePageTransition hook instead of local state

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      {isLoading && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999
        }}>
          <CircularProgress />
        </Box>
      )}
      
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
          {/* Left side - Welcome content */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', color: 'white', pr: 2 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                Welcome to APH Store
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Discover amazing products at unbeatable prices. Join our community of happy shoppers today!
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  <CheckCircleIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  <SecurityIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  <PersonIcon />
                </Avatar>
              </Box>
            </Box>
          </Grid>
          
          {/* Right side - Login/Registration Form */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pl: 4 }}>
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  APH Store
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  {activeTab === 0 ? 'Sign in to your account' : 'Create your account'}
                </Typography>
              </Box>
              
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered sx={{ mb: 3 }}>
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
              
              {/* Login Form */}
              <TabPanel value={activeTab} index={0}>
                <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 2 }}>
                  {loginError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {loginError}
                    </Alert>
                  )}
                  
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
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
                      )
                    }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                      />
                    }
                    label="Remember me"
                    sx={{ mb: 2 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ py: 1.5, mb: 2 }}
                    startIcon={<LoginIcon />}
                  >
                    Sign In
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleAdminLogin}
                    sx={{ py: 1.5 }}
                  >
                    Admin Login
                  </Button>
                </Box>
              </TabPanel>
              
              {/* Registration Form */}
              <TabPanel value={activeTab} index={1}>
                <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 2 }}>
                  {registerError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {registerError}
                    </Alert>
                  )}
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    required
                    sx={{ mt: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Phone"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    required
                    sx={{ mt: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                    sx={{ mt: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
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
                      )
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                    sx={{ mt: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
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
                      )
                    }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={registerData.agreeTerms}
                        onChange={(e) => setRegisterData({...registerData, agreeTerms: e.target.checked})}
                      />
                    }
                    label="I agree to the Terms of Service and Privacy Policy"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ py: 1.5 }}
                    startIcon={<PersonAddIcon />}
                  >
                    Create Account
                  </Button>
                </Box>
              </TabPanel>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Registration successful! Welcome to APH Store.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
