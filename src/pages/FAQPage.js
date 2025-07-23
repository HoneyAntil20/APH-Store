import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faChevronDown, 
  faChevronUp, 
  faShoppingCart, 
  faTruck, 
  faExchangeAlt, 
  faCreditCard, 
  faUserCircle, 
  faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Alert,
  Stack,
  Badge,
  Breadcrumbs,
  Tab,
  Tabs,
  Button,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  SwapHoriz as SwapHorizIcon,
  CreditCard as CreditCardIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ContactSupport as ContactSupportIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LiveHelp as LiveHelpIcon
} from '@mui/icons-material';

const FAQPage = () => {
  // FAQ categories
  const categories = [
    { id: 'orders', name: 'Orders', icon: faShoppingCart },
    { id: 'shipping', name: 'Shipping & Delivery', icon: faTruck },
    { id: 'returns', name: 'Returns & Refunds', icon: faExchangeAlt },
    { id: 'payment', name: 'Payment', icon: faCreditCard },
    { id: 'account', name: 'Account', icon: faUserCircle },
    { id: 'other', name: 'Other', icon: faQuestionCircle }
  ];

  // FAQ data
  const faqData = {
    orders: [
      {
        id: 1,
        question: 'How do I place an order?',
        answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information, then confirm your order.'
      },
      {
        id: 2,
        question: 'Can I modify or cancel my order?',
        answer: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance.'
      },
      {
        id: 3,
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.'
      },
      {
        id: 4,
        question: 'What if an item in my order is out of stock?',
        answer: 'If an item in your order is out of stock, we will notify you and provide options such as waiting for the item to be restocked, replacing it with a similar item, or receiving a refund for that item.'
      }
    ],
    shipping: [
      {
        id: 5,
        question: 'What shipping methods do you offer?',
        answer: 'We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and express shipping (1 business day). Shipping options and costs are displayed during checkout.'
      },
      {
        id: 6,
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location and will be calculated during checkout.'
      },
      {
        id: 7,
        question: 'Is free shipping available?',
        answer: 'Yes, we offer free standard shipping on orders over $100 within the United States.'
      },
      {
        id: 8,
        question: 'How long will it take to receive my order?',
        answer: 'Delivery times depend on your location and the shipping method selected. Standard shipping typically takes 5-7 business days, expedited shipping takes 2-3 business days, and express shipping takes 1 business day.'
      }
    ],
    returns: [
      {
        id: 9,
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of delivery. Items must be in their original condition with tags attached and original packaging.'
      },
      {
        id: 10,
        question: 'How do I return an item?',
        answer: 'To return an item, log into your account, go to your order history, select the order containing the item you wish to return, and follow the return instructions. You can also contact our customer service team for assistance.'
      },
      {
        id: 11,
        question: 'How long does it take to process a refund?',
        answer: 'Once we receive your returned item, it takes 3-5 business days to process the return. Refunds typically appear on your account within 5-10 business days, depending on your payment method and financial institution.'
      },
      {
        id: 12,
        question: 'Do I have to pay for return shipping?',
        answer: 'Return shipping costs are the responsibility of the customer, except in cases of damaged or defective items, or if we sent the wrong item.'
      }
    ],
    payment: [
      {
        id: 13,
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.'
      },
      {
        id: 14,
        question: 'Is it safe to enter my credit card information on your website?',
        answer: 'Yes, our website uses SSL encryption to protect your personal and payment information. We do not store your full credit card details on our servers.'
      },
      {
        id: 15,
        question: 'When will my credit card be charged?',
        answer: 'Your credit card will be authorized when you place your order and charged when your order ships.'
      },
      {
        id: 16,
        question: 'Do you offer installment payment options?',
        answer: 'Yes, we offer installment payment options through services like Affirm and Klarna on eligible purchases.'
      }
    ],
    account: [
      {
        id: 17,
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking on the "Sign Up" or "Register" link at the top of our website. You\'ll need to provide your email address and create a password.'
      },
      {
        id: 18,
        question: 'How can I reset my password?',
        answer: 'To reset your password, click on the "Login" link, then select "Forgot Password." Enter your email address, and we\'ll send you instructions to reset your password.'
      },
      {
        id: 19,
        question: 'Can I place an order without creating an account?',
        answer: 'Yes, you can check out as a guest without creating an account. However, creating an account allows you to track orders, save addresses, and enjoy a faster checkout process for future purchases.'
      },
      {
        id: 20,
        question: 'How can I update my account information?',
        answer: 'To update your account information, log into your account, go to your profile or account settings, and make the necessary changes.'
      }
    ],
    other: [
      {
        id: 21,
        question: 'Do you have a loyalty program?',
        answer: 'Yes, we have a loyalty program where you earn points for purchases, reviews, and referrals. These points can be redeemed for discounts on future purchases.'
      },
      {
        id: 22,
        question: 'How can I contact customer service?',
        answer: 'You can contact our customer service team by email at support@aphstore.com, by phone at +1 (123) 456-7890, or through the contact form on our website.'
      },
      {
        id: 23,
        question: 'Do you offer gift wrapping?',
        answer: 'Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout.'
      },
      {
        id: 24,
        question: 'Are gift cards available?',
        answer: 'Yes, we offer digital and physical gift cards in various denominations. You can purchase them on our website under the "Gift Cards" section.'
      }
    ]
  };

  // State for active category and expanded questions
  const [activeCategory, setActiveCategory] = useState('orders');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <Layout>
      {/* Page Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Find answers to common questions about our products and services
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Typography color="text.primary">FAQ</Typography>
        </Breadcrumbs>

        {/* Search Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <SearchIcon />
            </Avatar>
            <TextField
              fullWidth
              placeholder="Search for answers..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" size="large">
              Search
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* FAQ Categories */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List>
                {categories.map(category => (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      selected={activeCategory === category.id}
                      onClick={() => setActiveCategory(category.id)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: activeCategory === category.id ? 'primary.light' : 'grey.200'
                        }}>
                          {category.id === 'orders' && <ShoppingCartIcon />}
                          {category.id === 'shipping' && <LocalShippingIcon />}
                          {category.id === 'returns' && <SwapHorizIcon />}
                          {category.id === 'payment' && <CreditCardIcon />}
                          {category.id === 'account' && <AccountCircleIcon />}
                          {category.id === 'other' && <HelpOutlineIcon />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={category.name}
                        sx={{ 
                          color: activeCategory === category.id ? 'white' : 'inherit'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* FAQ Questions */}
          <Grid item xs={12} md={9}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5">
                  {categories.find(c => c.id === activeCategory).name}
                </Typography>
                <Chip 
                  label={`${faqData[activeCategory].length} Questions`} 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 2 }}
                />
              </Box>
              
              <Stack spacing={2}>
                {faqData[activeCategory].map((item, index) => (
                  <Accordion key={item.id} elevation={1}>
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          alignItems: 'center'
                        }
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
                        <Typography variant="body2" color="white">
                          {index + 1}
                        </Typography>
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary" sx={{ pl: 6 }}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Support Section */}
        <Paper elevation={2} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
            <ContactSupportIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Couldn't Find Your Answer?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Our customer service team is here to help you with any questions or concerns.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              component={Link} 
              to="/contact"
              startIcon={<ContactSupportIcon />}
              size="large"
            >
              Contact Us
            </Button>
            <Button 
              variant="outlined" 
              href="mailto:support@aphstore.com"
              startIcon={<EmailIcon />}
              size="large"
            >
              Email Support
            </Button>
            <Button 
              variant="outlined" 
              href="tel:+11234567890"
              startIcon={<PhoneIcon />}
              size="large"
            >
              Call Us
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
};

export default FAQPage;