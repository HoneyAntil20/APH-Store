import React from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Avatar,
  LinearProgress,
  Chip,
  Link,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Slider,
  Switch,
  Autocomplete,
  Container,
  Fade,
  Slide,
  Zoom,
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
  Home as HomeIcon,
  Business as BusinessIcon,
  AccountCircle as AccountCircleIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  CalendarToday as CalendarTodayIcon,
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Send as SendIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  Celebration as CelebrationIcon,
  Rocket as RocketIcon,
  Public as PublicIcon,
  Language as LanguageIcon,
  Interests as InterestsIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Animated keyframes
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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(-45deg, 
    ${theme.palette.primary.main}15,
    ${theme.palette.secondary.main}15,
    ${theme.palette.success.main}15,
    ${theme.palette.info.main}15)`,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.1) 0%, transparent 50%)',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.98),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: 24,
  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    animation: `${shimmer} 4s infinite`,
  },
}));

const StepCard = styled(Card)(({ theme, active }) => ({
  background: active 
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})` 
    : alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
  border: `2px solid ${active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: 16,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const FloatingIcon = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  animation: `${floatAnimation} 4s ease-in-out infinite`,
  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    background: 'inherit',
    borderRadius: 'inherit',
    filter: 'blur(12px)',
    opacity: 0.3,
    zIndex: -1,
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: alpha(theme.palette.background.paper, 0.9),
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: theme.palette.background.paper,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    },
    '&.Mui-focused': {
      background: theme.palette.background.paper,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: 12,
  padding: '12px 32px',
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
}));

const AnimatedStepper = styled(Stepper)(({ theme }) => ({
  background: 'transparent',
  padding: '24px 0',
  '& .MuiStepIcon-root': {
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    '&.Mui-active': {
      color: theme.palette.primary.main,
      animation: `${pulse} 2s infinite`,
    },
    '&.Mui-completed': {
      color: theme.palette.success.main,
    },
  },
  '& .MuiStepLabel-label': {
    fontWeight: 600,
    '&.Mui-active': {
      color: theme.palette.primary.main,
    },
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  background: alpha(theme.palette.primary.main, 0.1),
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const ModernSignUpForm = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    newsletter: false,
    terms: false,
    privacy: false,
    notifications: true,
    bio: '',
    interests: [],
    experience: 0,
    profilePicture: null
  });
  
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const steps = [
    { 
      label: 'Personal Info', 
      icon: <PersonIcon />,
      description: 'Tell us about yourself'
    },
    { 
      label: 'Account Setup', 
      icon: <AccountCircleIcon />,
      description: 'Create your account'
    },
    { 
      label: 'Address Details', 
      icon: <HomeIcon />,
      description: 'Where are you located?'
    },
    { 
      label: 'Preferences', 
      icon: <StarIcon />,
      description: 'Customize your experience'
    }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Italy', 'Spain', 'Australia', 'Japan', 'India', 'Brazil', 'Mexico'
  ];

  const interests = [
    'Technology', 'Fashion', 'Sports', 'Music', 'Travel', 'Food', 
    'Art', 'Reading', 'Gaming', 'Photography', 'Fitness', 'Movies'
  ];

  const handleInputChange = (field) => (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    
    // Format phone number input
    if (field === 'phone') {
      // Remove all non-digit characters
      const cleanValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      if (cleanValue.length <= 10) {
        // Format as (XXX) XXX-XXXX
        if (cleanValue.length >= 6) {
          value = `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6)}`;
        } else if (cleanValue.length >= 3) {
          value = `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
        } else {
          value = cleanValue;
        }
      } else {
        // Don't update if more than 10 digits
        return;
      }
    }
    
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

  const handleInterestsChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      interests: newValue
    }));
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        
        // Enhanced email validation
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        
        // Phone number validation (10 digits)
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else {
          const cleanPhone = formData.phone.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
          }
        }
        break;
        
      case 1:
        if (!formData.username) newErrors.username = 'Username is required';
        
        // Enhanced password validation
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)';
          }
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      case 2:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
        
      case 3:
        if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
        if (!formData.privacy) newErrors.privacy = 'You must accept the privacy policy';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateStep(activeStep)) {
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        console.log('Form submitted:', formData);
      }, 2000);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="Phone Number"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone || 'Enter 10-digit phone number'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange('dateOfBirth')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.gender}
                    onChange={handleInputChange('gender')}
                    sx={{ mt: 1 }}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel value="prefer-not-to-say" control={<Radio />} label="Prefer not to say" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Fade>
        );
        
      case 1:
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                        <AccountCircleIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <ModernTextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: 'primary.main' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    background: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom sx={{ color: 'success.main', fontWeight: 600 }}>
                    Password Requirements:
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon color={formData.password.length >= 8 ? 'success' : 'disabled'} fontSize="small" />
                      <Typography variant="body2">At least 8 characters</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon color={/[A-Z]/.test(formData.password) ? 'success' : 'disabled'} fontSize="small" />
                      <Typography variant="body2">One uppercase letter</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon color={/[a-z]/.test(formData.password) ? 'success' : 'disabled'} fontSize="small" />
                      <Typography variant="body2">One lowercase letter</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon color={/[0-9]/.test(formData.password) ? 'success' : 'disabled'} fontSize="small" />
                      <Typography variant="body2">One number</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon color={/[@$!%*?&]/.test(formData.password) ? 'success' : 'disabled'} fontSize="small" />
                      <Typography variant="body2">One special character (@$!%*?&)</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Fade>
        );
        
      case 2:
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ModernTextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  error={!!errors.address}
                  helperText={errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  error={!!errors.city}
                  helperText={errors.city}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="State/Province"
                  value={formData.state}
                  onChange={handleInputChange('state')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModernTextField
                  fullWidth
                  label="ZIP/Postal Code"
                  value={formData.zipCode}
                  onChange={handleInputChange('zipCode')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.country}
                    onChange={handleInputChange('country')}
                    error={!!errors.country}
                    sx={{ borderRadius: 3 }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && (
                    <FormHelperText error>{errors.country}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Fade>
        );
        
      case 3:
        return (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Your Interests
                </Typography>
                <Autocomplete
                  multiple
                  options={interests}
                  value={formData.interests}
                  onChange={handleInterestsChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ 
                          borderRadius: 2,
                          background: alpha(theme.palette.primary.main, 0.1),
                          borderColor: 'primary.main'
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <ModernTextField
                      {...params}
                      variant="outlined"
                      label="Select your interests"
                      placeholder="Choose tags..."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <InterestsIcon color="primary" />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Experience Level
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={formData.experience}
                    onChange={(e, value) => setFormData(prev => ({ ...prev, experience: value }))}
                    step={1}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Beginner' },
                      { value: 5, label: 'Intermediate' },
                      { value: 10, label: 'Expert' }
                    ]}
                    sx={{
                      color: 'primary.main',
                      '& .MuiSlider-thumb': {
                        boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                      },
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Communication Preferences
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.newsletter}
                        onChange={handleInputChange('newsletter')}
                        color="primary"
                      />
                    }
                    label="Subscribe to newsletter"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.notifications}
                        onChange={handleInputChange('notifications')}
                        color="primary"
                      />
                    }
                    label="Enable notifications"
                  />
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Legal Agreements
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.terms}
                        onChange={handleInputChange('terms')}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the <Link href="#" color="primary">Terms and Conditions</Link>
                      </Typography>
                    }
                  />
                  {errors.terms && (
                    <FormHelperText error>{errors.terms}</FormHelperText>
                  )}
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.privacy}
                        onChange={handleInputChange('privacy')}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the <Link href="#" color="primary">Privacy Policy</Link>
                      </Typography>
                    }
                  />
                  {errors.privacy && (
                    <FormHelperText error>{errors.privacy}</FormHelperText>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Fade>
        );
        
      default:
        return null;
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <GradientBackground>
      <Container maxWidth="md">
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
          <GlassCard sx={{ width: '100%', maxWidth: 800 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <FloatingIcon sx={{ mx: 'auto', mb: 2, width: 80, height: 80 }}>
                  <RocketIcon sx={{ fontSize: 40 }} />
                </FloatingIcon>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Join Our Community
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Create your account and start your amazing journey with us
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <ProgressBar variant="determinate" value={progress} sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Step {activeStep + 1} of {steps.length} - {Math.round(progress)}% complete
                  </Typography>
                </Box>
              </Box>
              
              <AnimatedStepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={({ active, completed }) => (
                        <Zoom in timeout={300}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: completed ? 'success.main' : active ? 'primary.main' : 'grey.400',
                              color: 'white',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {completed ? <CheckIcon /> : step.icon}
                          </Avatar>
                        </Zoom>
                      )}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {step.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </StepLabel>
                  </Step>
                ))}
              </AnimatedStepper>
              
              <Box sx={{ mb: 4 }}>
                {getStepContent(activeStep)}
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, borderRadius: 2 }}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                
                {activeStep === steps.length - 1 ? (
                  <GradientButton
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CelebrationIcon />}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </GradientButton>
                ) : (
                  <GradientButton
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </GradientButton>
                )}
              </Box>
              
              <Divider sx={{ my: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  OR SIGN UP WITH
                </Typography>
              </Divider>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={() => handleSocialLogin('Google')}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    onClick={() => handleSocialLogin('Facebook')}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AppleIcon />}
                    onClick={() => handleSocialLogin('Apple')}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    Apple
                  </Button>
                </Grid>
              </Grid>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    href="#" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </GlassCard>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default ModernSignUpForm;