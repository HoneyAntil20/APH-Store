import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Rating,
  LinearProgress,
  Badge,
  Card,
  CardContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  Support as SupportIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Restaurant as RestaurantIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  DirectionsCar as DirectionsCarIcon,
  PhotoCamera as PhotoCameraIcon,
  MusicNote as MusicNoteIcon,
  Movie as MovieIcon,
  SportsEsports as SportsEsportsIcon,
  FitnessCenter as FitnessCenterIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

const MuiAccordion = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [multipleExpanded, setMultipleExpanded] = React.useState({});
  const [formData, setFormData] = React.useState({
    notifications: true,
    autoSave: false,
    theme: 'light',
    language: 'en'
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleMultipleChange = (panel) => (event, isExpanded) => {
    setMultipleExpanded(prev => ({
      ...prev,
      [panel]: isExpanded
    }));
  };

  const handleFormChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked !== undefined ? event.target.checked : event.target.value
    }));
  };

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in your email address, create a password, and follow the verification steps.",
      icon: <PersonIcon />
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
      icon: <PaymentIcon />
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. Free shipping is available for orders over $50.",
      icon: <LocalShippingIcon />
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items. Items must be in original condition with tags attached. Return shipping is free for defective items.",
      icon: <AssignmentIcon />
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section.",
      icon: <ShoppingCartIcon />
    }
  ];

  const categories = [
    { name: 'Electronics', count: 1250, icon: <PhotoCameraIcon /> },
    { name: 'Fashion', count: 890, icon: <PersonIcon /> },
    { name: 'Home & Garden', count: 634, icon: <HomeIcon /> },
    { name: 'Sports', count: 445, icon: <FitnessCenterIcon /> },
    { name: 'Books', count: 789, icon: <SchoolIcon /> },
    { name: 'Music', count: 567, icon: <MusicNoteIcon /> },
    { name: 'Movies', count: 345, icon: <MovieIcon /> },
    { name: 'Games', count: 234, icon: <SportsEsportsIcon /> }
  ];

  const features = [
    { name: 'Free Shipping', description: 'Free shipping on orders over $50', status: 'available' },
    { name: '24/7 Support', description: 'Round-the-clock customer support', status: 'available' },
    { name: 'Easy Returns', description: '30-day hassle-free returns', status: 'available' },
    { name: 'Price Matching', description: 'We match competitor prices', status: 'coming-soon' },
    { name: 'Loyalty Program', description: 'Earn points with every purchase', status: 'beta' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Accordion Collection
      </Typography>

      {/* Basic Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Accordion
        </Typography>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>General Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This is the basic accordion component. It can be used to organize content
              in a collapsible format, making it easier to navigate through large amounts
              of information.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Features include customizable styling, controlled expansion,
              and support for complex content including forms, lists, and media.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* FAQ Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          FAQ Accordion
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={multipleExpanded[`faq${index}`] || false}
            onChange={handleMultipleChange(`faq${index}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  {faq.icon}
                </Avatar>
                <Typography>{faq.question}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" sx={{ pl: 6 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Settings Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Settings Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.settings1 || false}
          onChange={handleMultipleChange('settings1')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NotificationsIcon />
              <Typography>Notifications</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications}
                    onChange={handleFormChange('notifications')}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.autoSave}
                    onChange={handleFormChange('autoSave')}
                  />
                }
                label="Auto-save Changes"
              />
              <TextField
                label="Notification Frequency"
                select
                SelectProps={{ native: true }}
                value={formData.language}
                onChange={handleFormChange('language')}
                size="small"
              >
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </TextField>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={multipleExpanded.settings2 || false}
          onChange={handleMultipleChange('settings2')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaletteIcon />
              <Typography>Appearance</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                label="Theme"
                select
                SelectProps={{ native: true }}
                value={formData.theme}
                onChange={handleFormChange('theme')}
                size="small"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </TextField>
              <TextField
                label="Language"
                select
                SelectProps={{ native: true }}
                value={formData.language}
                onChange={handleFormChange('language')}
                size="small"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </TextField>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Category Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Category Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.categories || false}
          onChange={handleMultipleChange('categories')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BusinessIcon />
              <Typography>Product Categories</Typography>
              <Chip label={categories.length} size="small" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {categories.map((category, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    secondary={`${category.count} products`}
                  />
                  <Badge badgeContent={category.count} color="primary" />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Features Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Features Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.features || false}
          onChange={handleMultipleChange('features')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StarIcon />
              <Typography>Platform Features</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{feature.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={feature.status}
                    color={
                      feature.status === 'available' ? 'success' :
                      feature.status === 'beta' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Progress Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Progress Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.progress || false}
          onChange={handleMultipleChange('progress')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <StorageIcon />
              <Box sx={{ flex: 1 }}>
                <Typography>Storage Usage</Typography>
                <LinearProgress variant="determinate" value={65} sx={{ mt: 1 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                65%
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Photos</Typography>
                  <Typography variant="body2">2.3 GB</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Documents</Typography>
                  <Typography variant="body2">1.1 GB</Typography>
                </Box>
                <LinearProgress variant="determinate" value={25} color="success" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Videos</Typography>
                  <Typography variant="body2">0.8 GB</Typography>
                </Box>
                <LinearProgress variant="determinate" value={20} color="warning" />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Contact Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Contact Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.contact || false}
          onChange={handleMultipleChange('contact')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SupportIcon />
              <Typography>Contact Information</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <EmailIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">Email Support</Typography>
                      <Typography variant="body2" color="text.secondary">
                        support@example.com
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <PhoneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">Phone Support</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +1 (555) 123-4567
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              
              <Button variant="outlined" fullWidth>
                Start Live Chat
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Custom Styled Accordion */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Custom Styled Accordion
        </Typography>
        <Accordion
          expanded={multipleExpanded.custom || false}
          onChange={handleMultipleChange('custom')}
          sx={{
            '&:before': {
              display: 'none',
            },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&:first-of-type': {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
            '&:last-of-type': {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: 'action.hover',
              '&.Mui-expanded': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <HelpIcon />
              <Typography>Custom Styled Section</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: 'background.default',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography>
              This accordion has custom styling applied to demonstrate how you can
              customize the appearance of accordion components to match your design system.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default MuiAccordion;