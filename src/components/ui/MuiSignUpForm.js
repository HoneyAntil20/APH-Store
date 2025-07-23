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
  Autocomplete
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
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
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
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const MuiSignUpForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    gender: '',
    
    // Account Info
    username: '',
    password: '',
    confirmPassword: '',
    
    // Address Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Preferences
    newsletter: false,
    terms: false,
    privacy: false,
    notifications: true,
    
    // Profile
    bio: '',
    interests: [],
    experience: 0,
    profilePicture: null
  });
  
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const steps = ['Personal Information', 'Account Setup', 'Address Details', 'Preferences'];

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
    
    // Clear error when user starts typing
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
      case 0: // Personal Information
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
        
      case 1: // Account Setup
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
        
      case 2: // Address Details
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
        
      case 3: // Preferences
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
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log('Form submitted:', formData);
        // Handle successful submission
      }, 2000);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
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
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
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
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange('dateOfBirth')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={handleInputChange('gender')}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                  <FormControlLabel value="prefer-not-to-say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                      <AccountCircleIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.address}
                onChange={handleInputChange('address')}
                error={!!errors.address}
                helperText={errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={handleInputChange('city')}
                error={!!errors.city}
                helperText={errors.city}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                value={formData.state}
                onChange={handleInputChange('state')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP/Postal Code"
                value={formData.zipCode}
                onChange={handleInputChange('zipCode')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={countries}
                value={formData.country}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, country: newValue }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
        
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio (Optional)"
                multiline
                rows={4}
                value={formData.bio}
                onChange={handleInputChange('bio')}
                placeholder="Tell us about yourself..."
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={interests}
                value={formData.interests}
                onChange={handleInterestsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interests"
                    placeholder="Select your interests"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Experience Level: {formData.experience} years
              </Typography>
              <Slider
                value={formData.experience}
                onChange={(event, newValue) => setFormData(prev => ({ ...prev, experience: newValue }))}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={20}
                marks={[
                  { value: 0, label: 'Beginner' },
                  { value: 5, label: '5 years' },
                  { value: 10, label: '10 years' },
                  { value: 20, label: 'Expert' }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications}
                    onChange={handleInputChange('notifications')}
                  />
                }
                label="Receive email notifications about updates and offers"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.newsletter}
                    onChange={handleInputChange('newsletter')}
                  />
                }
                label="Subscribe to our newsletter"
              />
            </Grid>
            <Grid item xs={12}>
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
                    I agree to the{' '}
                    <Link href="#" color="primary">
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
              />
              {errors.terms && (
                <FormHelperText error>{errors.terms}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
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
                    I agree to the{' '}
                    <Link href="#" color="primary">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {errors.privacy && (
                <FormHelperText error>{errors.privacy}</FormHelperText>
              )}
            </Grid>
          </Grid>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Typography variant="h4" gutterBottom sx={{ alignSelf: 'flex-start' }}>
        MUI Sign Up Forms
      </Typography>

      {/* Multi-step Sign Up Form */}
      <Box sx={{ mb: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="h6" gutterBottom sx={{ alignSelf: 'flex-start' }}>
          Multi-step Sign Up Form
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 800, mr: 0 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              
              <Box sx={{ flex: '1 1 auto' }} />
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={<SendIcon />}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Simple Sign Up Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Simple Sign Up Form
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5">Create Account</Typography>
            <Typography variant="body2" color="text.secondary">
              Join us today and start your journey
            </Typography>
          </Box>
          
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
            
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link href="#" color="primary">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" color="primary">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Create Account
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
              >
                Continue with Google
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin('Facebook')}
              >
                Continue with Facebook
              </Button>
            </Stack>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link href="#" color="primary">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Professional Sign Up Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Professional Sign Up Form
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
              <BusinessIcon />
            </Avatar>
            <Typography variant="h5">Professional Account</Typography>
            <Typography variant="body2" color="text.secondary">
              Create your professional profile
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Professional Email"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value=""
                  label="Industry"
                >
                  <MenuItem value="tech">Technology</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                  <MenuItem value="manufacturing">Manufacturing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="I want to receive marketing communications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required />}
                label="I agree to the Terms of Service and Privacy Policy"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<VerifiedIcon />}
              >
                Create Professional Account
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default MuiSignUpForm;