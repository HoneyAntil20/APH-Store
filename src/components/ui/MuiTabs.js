import React from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Stack,
  Divider,
  Button,
  TextField,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Info as InfoIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Web as WebIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Filter as FilterIcon,
  Sort as SortIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Assignment as AssignmentIcon,
  Help as HelpIcon,
  ContactSupport as ContactSupportIcon,
  Feedback as FeedbackIcon,
  BugReport as BugReportIcon,
  Forum as ForumIcon,
  QuestionAnswer as QuestionAnswerIcon,
  FitnessCenter as FitnessCenterIcon,
  LibraryBooks as LibraryBooksIcon,
  SportsEsports as SportsEsportsIcon,
  LocalHospital as LocalHospitalIcon,
  DirectionsCar as DirectionsCarIcon,
  Restaurant as RestaurantIcon,
  Flight as FlightIcon
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MuiTabs = () => {
  const [basicValue, setBasicValue] = React.useState(0);
  const [verticalValue, setVerticalValue] = React.useState(0);
  const [dashboardValue, setDashboardValue] = React.useState(0);
  const [profileValue, setProfileValue] = React.useState(0);
  const [shoppingValue, setShoppingValue] = React.useState(0);
  const [supportValue, setSupportValue] = React.useState(0);
  const [scrollableValue, setScrollableValue] = React.useState(0);

  const handleBasicChange = (event, newValue) => {
    setBasicValue(newValue);
  };

  const handleVerticalChange = (event, newValue) => {
    setVerticalValue(newValue);
  };

  const handleDashboardChange = (event, newValue) => {
    setDashboardValue(newValue);
  };

  const handleProfileChange = (event, newValue) => {
    setProfileValue(newValue);
  };

  const handleShoppingChange = (event, newValue) => {
    setShoppingValue(newValue);
  };

  const handleSupportChange = (event, newValue) => {
    setSupportValue(newValue);
  };

  const handleScrollableChange = (event, newValue) => {
    setScrollableValue(newValue);
  };

  // Sample data
  const salesData = [
    { period: 'This Month', sales: '$12,345', change: '+12.5%', trend: 'up' },
    { period: 'Last Month', sales: '$10,987', change: '+8.2%', trend: 'up' },
    { period: '3 Months Ago', sales: '$9,876', change: '-2.1%', trend: 'down' }
  ];

  const products = [
    { name: 'Wireless Headphones', price: '$199', stock: 45, status: 'In Stock' },
    { name: 'Smart Watch', price: '$299', stock: 12, status: 'Low Stock' },
    { name: 'Laptop Bag', price: '$79', stock: 0, status: 'Out of Stock' }
  ];

  const orders = [
    { id: '#1234', customer: 'John Doe', amount: '$299', status: 'Shipped' },
    { id: '#1235', customer: 'Jane Smith', amount: '$159', status: 'Processing' },
    { id: '#1236', customer: 'Mike Johnson', amount: '$499', status: 'Delivered' }
  ];

  const reviews = [
    { product: 'Wireless Headphones', rating: 5, comment: 'Excellent quality!', user: 'Alice' },
    { product: 'Smart Watch', rating: 4, comment: 'Great features', user: 'Bob' },
    { product: 'Laptop Bag', rating: 5, comment: 'Perfect size', user: 'Charlie' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MUI Tabs Collection
      </Typography>

      {/* Basic Tabs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Tabs
        </Typography>
        <Paper sx={{ width: '100%' }}>
          <Tabs value={basicValue} onChange={handleBasicChange} aria-label="basic tabs">
            <Tab label="Tab One" {...a11yProps(0)} />
            <Tab label="Tab Two" {...a11yProps(1)} />
            <Tab label="Tab Three" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={basicValue} index={0}>
            <Typography>Content for Tab One</Typography>
            <Typography color="text.secondary">
              This is the first tab content. You can put any React component here.
            </Typography>
          </TabPanel>
          <TabPanel value={basicValue} index={1}>
            <Typography>Content for Tab Two</Typography>
            <Typography color="text.secondary">
              This is the second tab content with different information.
            </Typography>
          </TabPanel>
          <TabPanel value={basicValue} index={2}>
            <Typography>Content for Tab Three</Typography>
            <Typography color="text.secondary">
              This is the third tab content area.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Tabs with Icons */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tabs with Icons
        </Typography>
        <Paper sx={{ width: '100%' }}>
          <Tabs value={profileValue} onChange={handleProfileChange}>
            <Tab icon={<PersonIcon />} label="Profile" />
            <Tab icon={<SettingsIcon />} label="Settings" />
            <Tab icon={<NotificationsIcon />} label="Notifications" />
            <Tab icon={<SecurityIcon />} label="Security" />
          </Tabs>
          <TabPanel value={profileValue} index={0}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
                    JD
                  </Avatar>
                  <Box>
                    <Typography variant="h6">John Doe</Typography>
                    <Typography color="text.secondary">john.doe@example.com</Typography>
                  </Box>
                </Box>
                <Stack spacing={2}>
                  <TextField label="Full Name" defaultValue="John Doe" />
                  <TextField label="Email" defaultValue="john.doe@example.com" />
                  <TextField label="Phone" defaultValue="+1 (555) 123-4567" />
                  <Button variant="contained">Update Profile</Button>
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={profileValue} index={1}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Stack spacing={2}>
                  <TextField label="Username" defaultValue="johndoe" />
                  <TextField label="Time Zone" select SelectProps={{ native: true }}>
                    <option value="utc">UTC</option>
                    <option value="est">EST</option>
                    <option value="pst">PST</option>
                  </TextField>
                  <TextField label="Language" select SelectProps={{ native: true }}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </TextField>
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={profileValue} index={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="SMS Notifications" secondary="Get text message alerts" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={profileValue} index={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Stack spacing={2}>
                  <Button variant="outlined">Change Password</Button>
                  <Button variant="outlined">Enable Two-Factor Authentication</Button>
                  <Button variant="outlined">View Login History</Button>
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Vertical Tabs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Vertical Tabs
        </Typography>
        <Paper sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}>
          <Tabs
            orientation="vertical"
            value={verticalValue}
            onChange={handleVerticalChange}
            aria-label="vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
          >
            <Tab label="Dashboard" icon={<HomeIcon />} />
            <Tab label="Products" icon={<InventoryIcon />} />
            <Tab label="Orders" icon={<ShoppingCartIcon />} />
            <Tab label="Customers" icon={<PeopleIcon />} />
            <Tab label="Reports" icon={<AssessmentIcon />} />
          </Tabs>
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <TabPanel value={verticalValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Dashboard Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary">Total Sales</Typography>
                      <Typography variant="h4">$12,345</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon color="success" />
                        <Typography color="success.main">+12.5%</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary">Orders</Typography>
                      <Typography variant="h4">1,234</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon color="success" />
                        <Typography color="success.main">+8.2%</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={verticalValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Product Management
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.status}
                            color={
                              product.status === 'In Stock' ? 'success' :
                              product.status === 'Low Stock' ? 'warning' : 'error'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={verticalValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Order Management
              </Typography>
              <List>
                {orders.map((order, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Order ${order.id}`}
                      secondary={`${order.customer} - ${order.amount}`}
                    />
                    <Chip
                      label={order.status}
                      color={
                        order.status === 'Delivered' ? 'success' :
                        order.status === 'Shipped' ? 'info' : 'warning'
                      }
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value={verticalValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Customer Management
              </Typography>
              <Typography>Customer data and management tools would go here.</Typography>
            </TabPanel>
            <TabPanel value={verticalValue} index={4}>
              <Typography variant="h6" gutterBottom>
                Sales Reports
              </Typography>
              <Typography>Detailed analytics and reports would be displayed here.</Typography>
            </TabPanel>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Tabs with Badges */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tabs with Badges
        </Typography>
        <Paper sx={{ width: '100%' }}>
          <Tabs value={shoppingValue} onChange={handleShoppingChange}>
            <Tab
              label={
                <Badge badgeContent={3} color="primary">
                  Cart
                </Badge>
              }
              icon={<ShoppingCartIcon />}
            />
            <Tab
              label={
                <Badge badgeContent={12} color="error">
                  Wishlist
                </Badge>
              }
              icon={<FavoriteIcon />}
            />
            <Tab
              label={
                <Badge badgeContent={5} color="success">
                  Orders
                </Badge>
              }
              icon={<LocalShippingIcon />}
            />
            <Tab
              label={
                <Badge badgeContent={8} color="warning">
                  Reviews
                </Badge>
              }
              icon={<StarIcon />}
            />
          </Tabs>
          <TabPanel value={shoppingValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Shopping Cart (3 items)
            </Typography>
            <Typography>Your cart items would be displayed here.</Typography>
          </TabPanel>
          <TabPanel value={shoppingValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Wishlist (12 items)
            </Typography>
            <Typography>Your saved items would be shown here.</Typography>
          </TabPanel>
          <TabPanel value={shoppingValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Order History (5 orders)
            </Typography>
            <Typography>Your past orders would be listed here.</Typography>
          </TabPanel>
          <TabPanel value={shoppingValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Product Reviews (8 reviews)
            </Typography>
            <List>
              {reviews.map((review, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={review.product}
                    secondary={
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">Rating:</Typography>
                          <Box sx={{ display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                fontSize="small"
                                color={i < review.rating ? 'warning' : 'action'}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Typography variant="body2">"{review.comment}" - {review.user}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Scrollable Tabs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Scrollable Tabs
        </Typography>
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={scrollableValue}
            onChange={handleScrollableChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable tabs"
          >
            <Tab label="Electronics" icon={<CategoryIcon />} />
            <Tab label="Fashion & Clothing" icon={<PersonIcon />} />
            <Tab label="Home & Garden" icon={<HomeIcon />} />
            <Tab label="Sports & Outdoors" icon={<FitnessCenterIcon />} />
            <Tab label="Books & Media" icon={<LibraryBooksIcon />} />
            <Tab label="Toys & Games" icon={<SportsEsportsIcon />} />
            <Tab label="Health & Beauty" icon={<LocalHospitalIcon />} />
            <Tab label="Automotive" icon={<DirectionsCarIcon />} />
            <Tab label="Food & Beverages" icon={<RestaurantIcon />} />
            <Tab label="Travel & Luggage" icon={<FlightIcon />} />
          </Tabs>
          <TabPanel value={scrollableValue} index={0}>
            <Typography variant="h6" gutterBottom>Electronics</Typography>
            <Typography>Latest gadgets and electronic devices.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={1}>
            <Typography variant="h6" gutterBottom>Fashion & Clothing</Typography>
            <Typography>Trendy clothes and fashion accessories.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={2}>
            <Typography variant="h6" gutterBottom>Home & Garden</Typography>
            <Typography>Everything for your home and garden.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={3}>
            <Typography variant="h6" gutterBottom>Sports & Outdoors</Typography>
            <Typography>Sporting goods and outdoor equipment.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={4}>
            <Typography variant="h6" gutterBottom>Books & Media</Typography>
            <Typography>Books, movies, music, and more.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={5}>
            <Typography variant="h6" gutterBottom>Toys & Games</Typography>
            <Typography>Fun toys and games for all ages.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={6}>
            <Typography variant="h6" gutterBottom>Health & Beauty</Typography>
            <Typography>Health and beauty products.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={7}>
            <Typography variant="h6" gutterBottom>Automotive</Typography>
            <Typography>Car parts and automotive accessories.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={8}>
            <Typography variant="h6" gutterBottom>Food & Beverages</Typography>
            <Typography>Delicious food and drinks.</Typography>
          </TabPanel>
          <TabPanel value={scrollableValue} index={9}>
            <Typography variant="h6" gutterBottom>Travel & Luggage</Typography>
            <Typography>Travel gear and luggage.</Typography>
          </TabPanel>
        </Paper>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Support Center Tabs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Support Center Tabs
        </Typography>
        <Paper sx={{ width: '100%' }}>
          <Tabs value={supportValue} onChange={handleSupportChange}>
            <Tab label="FAQ" icon={<HelpIcon />} />
            <Tab label="Contact" icon={<ContactSupportIcon />} />
            <Tab label="Feedback" icon={<FeedbackIcon />} />
            <Tab label="Bug Report" icon={<BugReportIcon />} />
          </Tabs>
          <TabPanel value={supportValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="How do I create an account?"
                  secondary="Click the sign-up button and follow the instructions."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How can I track my order?"
                  secondary="Use the tracking number sent to your email."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What is your return policy?"
                  secondary="We accept returns within 30 days of purchase."
                />
              </ListItem>
            </List>
          </TabPanel>
          <TabPanel value={supportValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Contact Support
            </Typography>
            <Stack spacing={2}>
              <TextField label="Your Name" />
              <TextField label="Email Address" />
              <TextField label="Subject" />
              <TextField
                label="Message"
                multiline
                rows={4}
              />
              <Button variant="contained">Send Message</Button>
            </Stack>
          </TabPanel>
          <TabPanel value={supportValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Feedback
            </Typography>
            <Stack spacing={2}>
              <Typography>How would you rate our service?</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <IconButton key={rating}>
                    <StarIcon />
                  </IconButton>
                ))}
              </Box>
              <TextField
                label="Your Feedback"
                multiline
                rows={4}
                placeholder="Tell us about your experience..."
              />
              <Button variant="contained">Submit Feedback</Button>
            </Stack>
          </TabPanel>
          <TabPanel value={supportValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Report a Bug
            </Typography>
            <Stack spacing={2}>
              <TextField label="Bug Title" />
              <TextField
                label="Bug Description"
                multiline
                rows={4}
                placeholder="Describe the issue you encountered..."
              />
              <TextField label="Steps to Reproduce" multiline rows={3} />
              <Button variant="contained">Submit Bug Report</Button>
            </Stack>
          </TabPanel>
        </Paper>
      </Box>
    </Box>
  );
};

export default MuiTabs;