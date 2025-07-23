import React from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Avatar,
  Link,
  FormHelperText,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Switch,
  Snackbar,
  Fade,
  Slide
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Apple as AppleIcon,
  Microsoft as MicrosoftIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Login as LoginIcon,
  LockOpen as LockOpenIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Fingerprint as FingerprintIcon,
  Shield as ShieldIcon,
  Key as KeyIcon,
  Smartphone as SmartphoneIcon,
  QrCode as QrCodeIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationOnIcon,
  DeviceUnknown as DeviceUnknownIcon,
  Computer as ComputerIcon,
  Tablet as TabletIcon,
  PhoneIphone as PhoneIphoneIcon
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MuiLoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginMethod, setLoginMethod] = React.useState(0);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    resetEmail: '',
    twoFactorCode: ''
  });
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setLoginMethod(newValue);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (loginMethod === 0) { // Email login
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (loginMethod === 1) { // Username login
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
    } else if (loginMethod === 2) { // Phone login
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setLoginError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate two-factor authentication requirement
      if (formData.email === 'admin@example.com') {
        setTwoFactorOpen(true);
      } else {
        setLoginSuccess(true);
      }
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    setLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
    }, 1500);
  };

  const handleForgotPassword = async () => {
    if (!formData.resetEmail) {
      setErrors({ resetEmail: 'Email is required' });
      return;
    }
    
    setLoading(true);
    
    // Simulate password reset email
    setTimeout(() => {
      setLoading(false);
      setForgotPasswordOpen(false);
      setLoginError('');
      // Show success message
      console.log('Password reset email sent');
    }, 1500);
  };

  const handleTwoFactorVerification = async () => {
    if (!formData.twoFactorCode) {
      setErrors({ twoFactorCode: 'Verification code is required' });
      return;
    }
    
    setLoading(true);
    
    // Simulate two-factor verification
    setTimeout(() => {
      setLoading(false);
      setTwoFactorOpen(false);
      setLoginSuccess(true);
    }, 1500);
  };

  const deviceIcons = {
    computer: <ComputerIcon />,
    tablet: <TabletIcon />,
    phone: <PhoneIphoneIcon />,
    unknown: <DeviceUnknownIcon />
  };

  const recentLogins = [
    { device: 'Windows Computer', location: 'New York, NY', time: '2 hours ago', type: 'computer' },
    { device: 'iPhone 12', location: 'Los Angeles, CA', time: '1 day ago', type: 'phone' },
    { device: 'iPad Pro', location: 'Chicago, IL', time: '3 days ago', type: 'tablet' }
  ];

  return (
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      }
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          alignSelf: 'center',
          color: 'white',
          fontWeight: 700,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          mb: 4
        }}
      >
        Beautiful Login Forms
      </Typography>

      {/* Multi-method Login Form */}
      <Box sx={{ mb: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ 
          p: 4, 
          maxWidth: 500, 
          width: '100%',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
              <LoginIcon />
            </Avatar>
            <Typography variant="h5">Welcome Back</Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>
          
          <Tabs value={loginMethod} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Email" icon={<EmailIcon />} />
            <Tab label="Username" icon={<PersonIcon />} />
            <Tab label="Phone" icon={<PhoneIcon />} />
          </Tabs>
          
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TabPanel value={loginMethod} index={0}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </TabPanel>
              
              <TabPanel value={loginMethod} index={1}>
                <TextField
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  error={!!errors.username}
                  helperText={errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </TabPanel>
              
              <TabPanel value={loginMethod} index={2}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </TabPanel>
              
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                helperText={errors.password}
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
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setForgotPasswordOpen(true)}
                >
                  Forgot password?
                </Link>
              </Box>
              
              {loginError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {loginError}
                </Alert>
              )}
              
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                startIcon={loading ? <CircularProgress size={16} /> : <LoginIcon />}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                >
                  Continue with Google
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={loading}
                >
                  Continue with Facebook
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AppleIcon />}
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={loading}
                >
                  Continue with Apple
                </Button>
              </Stack>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link href="#" color="primary">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Simple Login Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Simple Login Form
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h5">Sign In</Typography>
          </Box>
          
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
            
            <FormControlLabel
              control={<Checkbox />}
              label="Keep me signed in"
            />
            
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              Sign In
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Link href="#" variant="body2">
                Forgot your password?
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Admin Login Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Admin Login Form
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 450, mx: 'auto', bgcolor: 'grey.50' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'error.main', width: 60, height: 60 }}>
              <ShieldIcon />
            </Avatar>
            <Typography variant="h5">Admin Access</Typography>
            <Typography variant="body2" color="text.secondary">
              Authorized personnel only
            </Typography>
          </Box>
          
          <Alert severity="warning" sx={{ mb: 2 }}>
            This is a secure area. All login attempts are monitored.
          </Alert>
          
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Admin Email"
              type="email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SupervisorAccountIcon />
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              fullWidth
              label="Admin Password"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityIcon />
                  </InputAdornment>
                )
              }}
            />
            
            <FormControlLabel
              control={<Switch />}
              label="Enable session timeout"
            />
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="error"
              startIcon={<AdminIcon />}
            >
              Admin Sign In
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Modern Login Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Modern Login Form
        </Typography>
        <Card sx={{ maxWidth: 500, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 50, height: 50 }}>
                <LockOpenIcon />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                Welcome
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please sign in to continue
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ py: 1.5 }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={{ py: 1.5 }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }}>
              <Chip label="OR" size="small" />
            </Divider>
            
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="large"
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                size="large"
              />
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, fontSize: '1.1rem' }}
              >
                Sign In
              </Button>
            </Stack>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2">
                New here?{' '}
                <Link href="#" color="primary" sx={{ fontWeight: 'bold' }}>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Login with Device History */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Login with Device History
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'info.main' }}>
                  <FingerprintIcon />
                </Avatar>
                <Typography variant="h6">Secure Login</Typography>
              </Box>
              
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<VerifiedIcon />}
                >
                  Secure Sign In
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Recent Login Activity
              </Typography>
              <Stack spacing={2}>
                {recentLogins.map((login, index) => (
                  <Card key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {deviceIcons[login.type]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">
                          {login.device}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {login.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <ScheduleIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {login.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.resetEmail}
            onChange={handleInputChange('resetEmail')}
            error={!!errors.resetEmail}
            helperText={errors.resetEmail}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotPasswordOpen(false)}>Cancel</Button>
          <Button
            onClick={handleForgotPassword}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Two-Factor Authentication Dialog */}
      <Dialog open={twoFactorOpen} onClose={() => setTwoFactorOpen(false)}>
        <DialogTitle>Two-Factor Authentication</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'warning.main' }}>
              <SecurityIcon />
            </Avatar>
            <Typography variant="body2">
              Enter the verification code from your authenticator app.
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Verification Code"
            value={formData.twoFactorCode}
            onChange={handleInputChange('twoFactorCode')}
            error={!!errors.twoFactorCode}
            helperText={errors.twoFactorCode}
            inputProps={{ maxLength: 6 }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTwoFactorOpen(false)}>Cancel</Button>
          <Button
            onClick={handleTwoFactorVerification}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={loginSuccess}
        autoHideDuration={6000}
        onClose={() => setLoginSuccess(false)}
        TransitionComponent={Slide}
      >
        <Alert onClose={() => setLoginSuccess(false)} severity="success">
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MuiLoginForm;