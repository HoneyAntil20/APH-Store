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
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Snackbar,
  Fade,
  Slide,
  Container,
  Backdrop,
  useTheme,
  alpha,
  styled,
  keyframes
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
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  GitHub as GitHubIcon,
  Login as LoginIcon,
  Security as SecurityIcon,
  Send as SendIcon,
  Close as CloseIcon,
  LockOpen as LockOpenIcon,
  Fingerprint as FingerprintIcon,
  Shield as ShieldIcon,
  Star as StarIcon,
  AutoAwesome as AutoAwesomeIcon,
  Waves as WavesIcon
} from '@mui/icons-material';

// Animated gradient keyframes
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(-45deg, 
    ${theme.palette.primary.main}20,
    ${theme.palette.secondary.main}20,
    ${theme.palette.primary.light}20,
    ${theme.palette.secondary.light}20)`,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: 20,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
    animation: `${shimmer} 3s infinite`,
  },
}));

const FloatingIcon = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'inherit',
    borderRadius: 'inherit',
    filter: 'blur(8px)',
    opacity: 0.3,
    zIndex: -1,
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: alpha(theme.palette.background.paper, 0.8),
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: alpha(theme.palette.background.paper, 0.9),
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused': {
      background: theme.palette.background.paper,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: 12,
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  color: 'white',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
    '&::before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background: alpha(theme.palette.background.paper, 0.8),
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.05),
    borderColor: alpha(theme.palette.primary.main, 0.2),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const TabPanel = (props) => {
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
        <Fade in={value === index} timeout={300}>
          <Box sx={{ pt: 2 }}>
            {children}
          </Box>
        </Fade>
      )}
    </div>
  );
};

const ModernLoginForm = () => {
  const theme = useTheme();
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
    
    if (loginMethod === 0) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (loginMethod === 1) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
    } else if (loginMethod === 2) {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
    
    setTimeout(() => {
      setLoading(false);
      setForgotPasswordOpen(false);
      setLoginError('');
      console.log('Password reset email sent');
    }, 1500);
  };

  const handleTwoFactorVerification = async () => {
    if (!formData.twoFactorCode) {
      setErrors({ twoFactorCode: 'Verification code is required' });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setTwoFactorOpen(false);
      setLoginSuccess(true);
    }, 1500);
  };

  return (
    <GradientBackground>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            py: 4,
          }}
        >
          <GlassCard sx={{ width: '100%', maxWidth: 480 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <FloatingIcon sx={{ mx: 'auto', mb: 2, width: 80, height: 80 }}>
                  <AutoAwesomeIcon sx={{ fontSize: 40 }} />
                </FloatingIcon>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Sign in to your account and continue your journey
                </Typography>
                
                {/* Achievement badges */}
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                  <Chip
                    icon={<ShieldIcon />}
                    label="Secure"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={<StarIcon />}
                    label="Trusted"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={<FingerprintIcon />}
                    label="Fast"
                    color="secondary"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Box>
              
              <Tabs 
                value={loginMethod} 
                onChange={handleTabChange} 
                sx={{ 
                  mb: 3,
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    fontWeight: 600,
                    borderRadius: 2,
                    mx: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.05),
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
                centered
              >
                <Tab label="Email" icon={<EmailIcon />} />
                <Tab label="Username" icon={<PersonIcon />} />
                <Tab label="Phone" icon={<PhoneIcon />} />
              </Tabs>
              
              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TabPanel value={loginMethod} index={0}>
                    <ModernTextField
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
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </TabPanel>
                  
                  <TabPanel value={loginMethod} index={1}>
                    <ModernTextField
                      fullWidth
                      label="Username"
                      value={formData.username}
                      onChange={handleInputChange('username')}
                      error={!!errors.username}
                      helperText={errors.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </TabPanel>
                  
                  <TabPanel value={loginMethod} index={2}>
                    <ModernTextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </TabPanel>
                  
                  <ModernTextField
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
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'primary.main' }}
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
                          sx={{ color: 'primary.main' }}
                        />
                      }
                      label="Remember me"
                    />
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => setForgotPasswordOpen(true)}
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 500,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                  
                  {loginError && (
                    <Fade in={!!loginError}>
                      <Alert severity="error" sx={{ borderRadius: 2 }}>
                        {loginError}
                      </Alert>
                    </Fade>
                  )}
                  
                  <GradientButton
                    fullWidth
                    type="submit"
                    disabled={loading}
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </GradientButton>
                  
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                      OR CONTINUE WITH
                    </Typography>
                  </Divider>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <SocialButton
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={() => handleSocialLogin('Google')}
                        disabled={loading}
                      >
                        Google
                      </SocialButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <SocialButton
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={() => handleSocialLogin('Facebook')}
                        disabled={loading}
                      >
                        Facebook
                      </SocialButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <SocialButton
                        fullWidth
                        startIcon={<AppleIcon />}
                        onClick={() => handleSocialLogin('Apple')}
                        disabled={loading}
                      >
                        Apple
                      </SocialButton>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <Link 
                        href="#" 
                        sx={{ 
                          color: 'primary.main', 
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Sign up now
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </form>
            </CardContent>
          </GlassCard>
        </Box>
      </Container>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h6">Reset Password</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          <ModernTextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.resetEmail}
            onChange={handleInputChange('resetEmail')}
            error={!!errors.resetEmail}
            helperText={errors.resetEmail}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setForgotPasswordOpen(false)} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <GradientButton
            onClick={handleForgotPassword}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          >
            Send Reset Link
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Two Factor Authentication Dialog */}
      <Dialog
        open={twoFactorOpen}
        onClose={() => setTwoFactorOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'success.main' }}>
            <SecurityIcon />
          </Avatar>
          <Typography variant="h6">Two-Factor Authentication</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Please enter the 6-digit code from your authenticator app.
          </Typography>
          <ModernTextField
            fullWidth
            label="Verification Code"
            value={formData.twoFactorCode}
            onChange={handleInputChange('twoFactorCode')}
            error={!!errors.twoFactorCode}
            helperText={errors.twoFactorCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FingerprintIcon color="primary" />
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setTwoFactorOpen(false)} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <GradientButton
            onClick={handleTwoFactorVerification}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckIcon />}
          >
            Verify
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={loginSuccess}
        autoHideDuration={6000}
        onClose={() => setLoginSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setLoginSuccess(false)} 
          severity="success"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            background: alpha(theme.palette.success.main, 0.95),
            backdropFilter: 'blur(20px)',
          }}
        >
          Welcome back! You've successfully signed in.
        </Alert>
      </Snackbar>
    </GradientBackground>
  );
};

export default ModernLoginForm;