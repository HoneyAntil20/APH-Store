import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock, 
  faComments, 
  faQuestionCircle, 
  faShippingFast, 
  faExchangeAlt 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Link as MuiLink,
  Breadcrumbs,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as AccessTimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Support as SupportIcon,
  Help as HelpIcon,
  LocalShipping as LocalShippingIcon,
  Assignment as AssignmentIcon,
  Store as StoreIcon,
  ContactSupport as ContactSupportIcon
} from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Layout>
      {/* Page Header */}
      <Box
        sx={{
          height: 250,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 4
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            We're here to help! Get in touch with our team.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Typography color="text.primary">Contact Us</Typography>
        </Breadcrumbs>

        {/* Contact Information */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                We'd love to hear from you. Contact us using the information below or visit our store.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <LocationOnIcon />
                      </Avatar>
                      <Typography variant="h6">Address</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      123 Main Street<br />
                      City, State 12345<br />
                      Country
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                        <PhoneIcon />
                      </Avatar>
                      <Typography variant="h6">Phone</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      +1 (234) 567-8900<br />
                      +1 (234) 567-8901
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                        <EmailIcon />
                      </Avatar>
                      <Typography variant="h6">Email</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      support@aphstore.com<br />
                      info@aphstore.com
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                        <AccessTimeIcon />
                      </Avatar>
                      <Typography variant="h6">Working Hours</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Monday - Friday: 9am - 5pm<br />
                      Saturday: 10am - 2pm<br />
                      Sunday: Closed
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
                Connect With Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Follow us on social media for updates and special offers.
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <IconButton 
                  color="primary" 
                  href="https://facebook.com" 
                  target="_blank"
                  sx={{ bgcolor: '#1877f2', color: 'white', '&:hover': { bgcolor: '#166fe5' } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  color="primary" 
                  href="https://twitter.com" 
                  target="_blank"
                  sx={{ bgcolor: '#1da1f2', color: 'white', '&:hover': { bgcolor: '#0c85d0' } }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  color="primary" 
                  href="https://instagram.com" 
                  target="_blank"
                  sx={{ bgcolor: '#e4405f', color: 'white', '&:hover': { bgcolor: '#d62d4a' } }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  color="primary" 
                  href="https://youtube.com" 
                  target="_blank"
                  sx={{ bgcolor: '#ff0000', color: 'white', '&:hover': { bgcolor: '#cc0000' } }}
                >
                  <YouTubeIcon />
                </IconButton>
              </Stack>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Store Information
              </Typography>
              <Stack spacing={2}>
                <Chip 
                  icon={<StoreIcon />} 
                  label="Visit Our Store" 
                  variant="outlined" 
                  clickable
                />
                <Chip 
                  icon={<ContactSupportIcon />} 
                  label="24/7 Support" 
                  variant="outlined" 
                  color="success"
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Help Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
            How Can We Help You?
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <SupportIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Customer Support
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Need help with your order or have a question about our products?
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/faq"
                  size="small"
                >
                  Get Support
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
                }}
              >
                <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <HelpIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  FAQs
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Find answers to commonly asked questions about our services.
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/faq"
                  size="small"
                >
                  View FAQs
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
                }}
              >
                <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <LocalShippingIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Shipping & Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Information about shipping methods, costs, and delivery times.
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/faq"
                  size="small"
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
                }}
              >
                <Avatar sx={{ bgcolor: 'error.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <AssignmentIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Returns & Refunds
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Learn about our return policy and how to request a refund.
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/faq"
                  size="small"
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Map */}
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            title="Store Location"
          />
        </Paper>
      </Container>
    </Layout>
  );
};

export default ContactPage;