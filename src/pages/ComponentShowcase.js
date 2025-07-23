import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Avatar,
  Paper,
  Divider
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  Star, 
  Person,
  Settings,
  Home
} from '@mui/icons-material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ComponentShowcase = () => {
  return (
    <div className="page-container">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Component Showcase
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          A showcase of various Material-UI components used in the APH Store
        </Typography>

        <Grid container spacing={4}>
          {/* Buttons Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Buttons
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="contained" color="primary">
                  Primary Button
                </Button>
                <Button variant="outlined" color="secondary">
                  Secondary Button
                </Button>
                <Button variant="text" color="success">
                  Text Button
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" startIcon={<ShoppingCart />}>
                  Add to Cart
                </Button>
                <Button variant="outlined" startIcon={<Favorite />}>
                  Wishlist
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Cards Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Cards
              </Typography>
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Sample Product
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a sample product card showcasing the card component.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Star sx={{ color: 'gold', mr: 1 }} />
                    <Typography variant="body2">4.5 (123 reviews)</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Chips Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Chips
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Electronics" color="primary" />
                <Chip label="Fashion" color="secondary" />
                <Chip label="Books" color="success" />
                <Chip label="Sports" color="warning" />
                <Chip label="Sale" color="error" />
              </Box>
            </Paper>
          </Grid>

          {/* Avatars Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Avatars
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Settings />
                </Avatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Home />
                </Avatar>
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg">
                  U
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          {/* Typography Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Typography
              </Typography>
              <Typography variant="h1" gutterBottom>
                Heading 1
              </Typography>
              <Typography variant="h2" gutterBottom>
                Heading 2
              </Typography>
              <Typography variant="h3" gutterBottom>
                Heading 3
              </Typography>
              <Typography variant="h4" gutterBottom>
                Heading 4
              </Typography>
              <Typography variant="h5" gutterBottom>
                Heading 5
              </Typography>
              <Typography variant="h6" gutterBottom>
                Heading 6
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" gutterBottom>
                Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="body2" gutterBottom>
                Body 2: Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Caption text
              </Typography>
              <Typography variant="overline" display="block">
                Overline text
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default ComponentShowcase;