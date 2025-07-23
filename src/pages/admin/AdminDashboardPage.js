import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminDataTable from '../../components/admin/AdminDataTable';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const AdminDashboardPage = () => {
  // Sample dashboard data
  const dashboardData = {
    totalSales: 15890.75,
    salesChange: 12.5,
    totalOrders: 342,
    ordersChange: 8.3,
    totalCustomers: 1245,
    customersChange: 15.2,
    totalProducts: 567,
    productsChange: 3.7
  };

  // Sample recent orders data
  const recentOrders = [
    {
      id: 'ORD-12345',
      customer: 'John Doe',
      date: '2023-07-10',
      total: 249.99,
      status: 'Delivered'
    },
    {
      id: 'ORD-12346',
      customer: 'Jane Smith',
      date: '2023-07-09',
      total: 129.50,
      status: 'Processing'
    },
    {
      id: 'ORD-12347',
      customer: 'Robert Johnson',
      date: '2023-07-09',
      total: 399.95,
      status: 'Shipped'
    },
    {
      id: 'ORD-12348',
      customer: 'Emily Davis',
      date: '2023-07-08',
      total: 89.99,
      status: 'Pending'
    },
    {
      id: 'ORD-12349',
      customer: 'Michael Wilson',
      date: '2023-07-08',
      total: 159.75,
      status: 'Delivered'
    }
  ];

  // Sample top products data
  const topProducts = [
    {
      id: 1,
      name: 'Wireless Bluetooth Earbuds',
      sales: 87,
      revenue: 4349.13,
      stock: 45
    },
    {
      id: 5,
      name: 'Smartphone X Pro',
      sales: 64,
      revenue: 57599.36,
      stock: 12
    },
    {
      id: 8,
      name: 'Noise Cancelling Headphones',
      sales: 52,
      revenue: 7799.48,
      stock: 28
    },
    {
      id: 12,
      name: 'Smart Watch Series 5',
      sales: 49,
      revenue: 9799.51,
      stock: 18
    },
    {
      id: 15,
      name: 'Portable Bluetooth Speaker',
      sales: 43,
      revenue: 3439.57,
      stock: 32
    }
  ];

  // Define columns for recent orders table
  const orderColumns = [
    { id: 'id', label: 'Order ID' },
    { id: 'customer', label: 'Customer' },
    { id: 'date', label: 'Date', type: 'date' },
    { id: 'total', label: 'Total', type: 'currency' },
    { id: 'status', label: 'Status', type: 'chip', getColor: (status) => {
      switch(status.toLowerCase()) {
        case 'delivered': return 'success';
        case 'shipped': return 'info';
        case 'processing': return 'warning';
        case 'pending': return 'error';
        default: return 'default';
      }
    }}
  ];

  // Define columns for top products table
  const productColumns = [
    { id: 'name', label: 'Product' },
    { id: 'sales', label: 'Sales' },
    { id: 'revenue', label: 'Revenue', type: 'currency' },
    { id: 'stock', label: 'Stock' }
  ];

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Today is {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Sales"
            value={`₹${dashboardData.totalSales.toLocaleString()}`}
            change={dashboardData.salesChange}
            icon={<AttachMoneyIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Orders"
            value={dashboardData.totalOrders.toLocaleString()}
            change={dashboardData.ordersChange}
            icon={<ShoppingCartIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Customers"
            value={dashboardData.totalCustomers.toLocaleString()}
            change={dashboardData.customersChange}
            icon={<PeopleIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Products"
            value={dashboardData.totalProducts.toLocaleString()}
            change={dashboardData.productsChange}
            icon={<InventoryIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Dashboard Content */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} lg={8}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Recent Orders
                </Typography>
                <Button
                  component={Link}
                  to="/admin/orders"
                  variant="outlined"
                  size="small"
                >
                  View All
                </Button>
              </Box>
              <AdminDataTable
                columns={orderColumns}
                data={recentOrders}
                pagination={false}
                onView={(id) => console.log('View order', id)}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} lg={4}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Top Selling Products
                </Typography>
                <Button
                  component={Link}
                  to="/admin/products"
                  variant="outlined"
                  size="small"
                >
                  View All
                </Button>
              </Box>
              <AdminDataTable
                columns={productColumns}
                data={topProducts}
                pagination={false}
                onView={(id) => console.log('View product', id)}
              />
            </CardContent>
          </Card>
        </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboardPage;