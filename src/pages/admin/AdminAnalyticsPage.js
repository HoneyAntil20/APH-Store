import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminDataTable from '../../components/admin/AdminDataTable';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import {
  Download as DownloadIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  TableChart as TableChartIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingBag as ShoppingBagIcon,
  Percent as PercentIcon,
  Refresh as RefreshIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

const AdminAnalyticsPage = () => {
  // Date range state
  const [dateRange, setDateRange] = useState('last30days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  // Sample analytics data
  const analyticsData = {
    overview: {
      totalSales: 45890.75,
      totalOrders: 842,
      averageOrderValue: 54.50,
      conversionRate: 3.2
    },
    salesByCategory: [
      { category: 'Electronics', sales: 25890.50, percentage: 56.4 },
      { category: 'Fashion', sales: 8750.25, percentage: 19.1 },
      { category: 'Home & Kitchen', sales: 5430.75, percentage: 11.8 },
      { category: 'Sports', sales: 3210.50, percentage: 7.0 },
      { category: 'Books', sales: 2608.75, percentage: 5.7 }
    ],
    topProducts: [
      { id: 1, name: 'Smartphone X Pro', sales: 57599.36, units: 64 },
      { id: 2, name: 'Wireless Bluetooth Earbuds', sales: 4349.13, units: 87 },
      { id: 3, name: 'Noise Cancelling Headphones', sales: 7799.48, units: 52 },
      { id: 4, name: 'Smart Watch Series 5', sales: 9799.51, units: 49 },
      { id: 5, name: 'Portable Bluetooth Speaker', sales: 3439.57, units: 43 }
    ],
    customerAcquisition: {
      newCustomers: 245,
      returningCustomers: 597,
      totalCustomers: 842
    },
    trafficSources: [
      { id: 1, source: 'Direct', visits: 3250, percentage: 35.2 },
      { id: 2, source: 'Organic Search', visits: 2850, percentage: 30.9 },
      { id: 3, source: 'Social Media', visits: 1450, percentage: 15.7 },
      { id: 4, source: 'Referral', visits: 950, percentage: 10.3 },
      { id: 5, source: 'Email', visits: 730, percentage: 7.9 }
    ]
  };

  // Handle date range change
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  // Handle custom date change
  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Tab Panel Component
  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Analytics & Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive analytics dashboard to track your store performance
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Sales"
            value={`₹${analyticsData.overview.totalSales.toLocaleString()}`}
            change={12.5}
            icon={<AttachMoneyIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders.toLocaleString()}
            change={8.3}
            icon={<ShoppingBagIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Average Order Value"
            value={`₹${analyticsData.overview.averageOrderValue.toLocaleString()}`}
            change={3.7}
            icon={<TrendingUpIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Conversion Rate"
            value={`${analyticsData.overview.conversionRate}%`}
            change={0.8}
            icon={<PercentIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Date Range Filter */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Date Range & Filters
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select value={dateRange} onChange={handleDateRangeChange} label="Date Range">
                <MenuItem value="last7days">Last 7 Days</MenuItem>
                <MenuItem value="last30days">Last 30 Days</MenuItem>
                <MenuItem value="last90days">Last 90 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {dateRange === 'custom' && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  type="date"
                  label="Start Date"
                  name="startDate"
                  value={startDate}
                  onChange={handleCustomDateChange}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  type="date"
                  label="End Date"
                  name="endDate"
                  value={endDate}
                  onChange={handleCustomDateChange}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {/* Analytics Tabs */}
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Overview" />
          <Tab label="Sales Analytics" />
          <Tab label="Products" />
          <Tab label="Customers" />
          <Tab label="Traffic Sources" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={activeTab} index={0}>
        {/* Overview Tab */}
        <Grid container spacing={3}>
          {/* Sales Trend Chart */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Sales Trend
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
              </Box>
              <Box sx={{ 
                height: 350, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <ShowChartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Sales Trend Chart
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactive sales chart will be displayed here
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Top Products
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Sales</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analyticsData.topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="right">₹{product.sales.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {/* Sales Analytics Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Sales by Category
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
              </Box>
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <PieChartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Category Distribution Chart
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Monthly Sales
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
              </Box>
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <BarChartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Monthly Sales Chart
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        {/* Products Tab */}
        <AdminDataTable
          columns={[
            { id: 'name', label: 'Product Name' },
            { id: 'units', label: 'Units Sold' },
            { id: 'sales', label: 'Revenue', type: 'currency' }
          ]}
          data={analyticsData.topProducts}
          pagination={false}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        {/* Customers Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Customer Acquisition
              </Typography>
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <PieChartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Customer Acquisition Chart
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Customer Statistics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>New Customers:</strong> {analyticsData.customerAcquisition.newCustomers}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Returning Customers:</strong> {analyticsData.customerAcquisition.returningCustomers}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Total Customers:</strong> {analyticsData.customerAcquisition.totalCustomers}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={4}>
        {/* Traffic Sources Tab */}
        <AdminDataTable
          columns={[
            { id: 'source', label: 'Traffic Source' },
            { id: 'visits', label: 'Visits' },
            { id: 'percentage', label: 'Percentage' }
          ]}
          data={analyticsData.trafficSources}
          pagination={false}
        />
      </TabPanel>
      </Box>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;