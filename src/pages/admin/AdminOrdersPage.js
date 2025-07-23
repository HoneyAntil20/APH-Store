import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatsCard from '../../components/admin/AdminStatsCard';

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Container,
  Stack
} from '@mui/material';
import {
  Print as PrintIcon,
  Refresh as RefreshIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  AttachMoney as AttachMoneyIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sort as SortIcon
} from '@mui/icons-material';

const AdminOrdersPage = () => {
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      customer: 'John Doe',
      email: 'john.doe@example.com',
      date: '2023-07-10',
      total: 249.99,
      status: 'Delivered',
      items: 2,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-12346',
      customer: 'Jane Smith',
      email: 'jane.smith@example.com',
      date: '2023-07-09',
      total: 129.50,
      status: 'Processing',
      items: 1,
      payment: 'PayPal'
    },
    {
      id: 'ORD-12347',
      customer: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      date: '2023-07-09',
      total: 399.95,
      status: 'Shipped',
      items: 3,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-12348',
      customer: 'Emily Davis',
      email: 'emily.davis@example.com',
      date: '2023-07-08',
      total: 89.99,
      status: 'Pending',
      items: 1,
      payment: 'PayPal'
    },
    {
      id: 'ORD-12349',
      customer: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      date: '2023-07-08',
      total: 159.75,
      status: 'Delivered',
      items: 2,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-12350',
      customer: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      date: '2023-07-07',
      total: 299.99,
      status: 'Delivered',
      items: 1,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-12351',
      customer: 'David Miller',
      email: 'david.miller@example.com',
      date: '2023-07-07',
      total: 149.95,
      status: 'Cancelled',
      items: 2,
      payment: 'PayPal'
    },
    {
      id: 'ORD-12352',
      customer: 'Jennifer Taylor',
      email: 'jennifer.taylor@example.com',
      date: '2023-07-06',
      total: 79.99,
      status: 'Delivered',
      items: 1,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-12353',
      customer: 'Thomas Anderson',
      email: 'thomas.anderson@example.com',
      date: '2023-07-06',
      total: 199.99,
      status: 'Processing',
      items: 1,
      payment: 'PayPal'
    },
    {
      id: 'ORD-12354',
      customer: 'Lisa White',
      email: 'lisa.white@example.com',
      date: '2023-07-05',
      total: 349.95,
      status: 'Shipped',
      items: 3,
      payment: 'Credit Card'
    }
  ]);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // New order form state
  const [newOrder, setNewOrder] = useState({
    customer: '',
    email: '',
    total: '',
    status: 'Pending',
    items: 1,
    payment: 'Credit Card'
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle date filter
  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open view order modal
  const openViewModal = (order) => {
    setCurrentOrder(order);
    setShowViewModal(true);
  };

  // Open edit order modal
  const openEditModal = (order) => {
    setCurrentOrder(order);
    setShowEditModal(true);
  };

  // Open add order modal
  const openAddModal = () => {
    setNewOrder({
      customer: '',
      email: '',
      total: '',
      status: 'Pending',
      items: 1,
      payment: 'Credit Card'
    });
    setShowAddModal(true);
  };

  // Open delete order modal
  const openDeleteModal = (order) => {
    setCurrentOrder(order);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowAddModal(false);
    setShowDeleteModal(false);
    setCurrentOrder(null);
  };

  // Handle form changes
  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditOrderChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // CRUD Operations
  const addOrder = () => {
    if (!newOrder.customer || !newOrder.email || !newOrder.total) {
      alert('Please fill in all required fields');
      return;
    }

    const newOrderData = {
      ...newOrder,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      total: parseFloat(newOrder.total),
      items: parseInt(newOrder.items)
    };

    setOrders(prev => [newOrderData, ...prev]);
    closeModals();
  };

  const updateOrder = () => {
    if (!currentOrder.customer || !currentOrder.email || !currentOrder.total) {
      alert('Please fill in all required fields');
      return;
    }

    setOrders(prev => prev.map(order => 
      order.id === currentOrder.id ? {
        ...currentOrder,
        total: parseFloat(currentOrder.total),
        items: parseInt(currentOrder.items)
      } : order
    ));
    closeModals();
  };

  const deleteOrder = () => {
    setOrders(prev => prev.filter(order => order.id !== currentOrder.id));
    closeModals();
  };



  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => 
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || order.status === statusFilter) &&
      (dateFilter === '' || order.date === dateFilter)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // Get unique statuses for filter
  const statuses = ['All', ...new Set(orders.map(order => order.status))];

  // Calculate order stats
  const orderStats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'Pending').length,
    shippedOrders: orders.filter(order => order.status === 'Shipped').length,
    deliveredOrders: orders.filter(order => order.status === 'Delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    processingOrders: orders.filter(order => order.status === 'Processing').length,
    cancelledOrders: orders.filter(order => order.status === 'Cancelled').length
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Orders Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and track all customer orders. Total: {orderStats.totalOrders} orders
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={openAddModal}
          >
            Add Order
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Orders"
            value={orderStats.totalOrders.toLocaleString()}
            change={8.3}
            icon={<ShoppingCartIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Pending Orders"
            value={orderStats.pendingOrders.toLocaleString()}
            change={-2.1}
            icon={<AccessTimeIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Delivered Orders"
            value={orderStats.deliveredOrders.toLocaleString()}
            change={15.2}
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminStatsCard
            title="Total Revenue"
            value={`₹${orderStats.totalRevenue.toLocaleString()}`}
            change={12.5}
            icon={<AttachMoneyIcon />}
            color="info"
          />
        </Grid>
      </Grid>

          {/* Filters */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Filters & Search
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={handleStatusFilter} label="Status">
                {statuses.map((status, index) => (
                  <MenuItem key={index} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="date"
              label="Date"
              value={dateFilter}
              onChange={handleDateFilter}
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <Paper elevation={1} sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('id')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Order ID <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleSort('customer')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Customer <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleSort('date')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Date <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleSort('total')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Total <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleSort('status')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Status <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell onClick={() => handleSort('payment')} sx={{ cursor: 'pointer' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Payment <SortIcon sx={{ ml: 1 }} />
                  </Box>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status}
                      color={
                        order.status === 'Delivered' ? 'success' :
                        order.status === 'Processing' ? 'warning' :
                        order.status === 'Shipped' ? 'info' :
                        order.status === 'Cancelled' ? 'error' : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => openViewModal(order)}
                      title="View"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(order)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openDeleteModal(order)}
                      title="Delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small">Previous</Button>
          <Button variant="contained" size="small">1</Button>
          <Button variant="outlined" size="small">2</Button>
          <Button variant="outlined" size="small">3</Button>
          <Button variant="outlined" size="small">Next</Button>
        </Stack>
      </Box>

      {/* View Order Modal */}
      <Dialog open={showViewModal} onClose={closeModals} maxWidth="md" fullWidth>
        <DialogTitle>
          Order Details - {currentOrder?.id}
        </DialogTitle>
        <DialogContent>
          {currentOrder && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Order Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Order ID:</strong> {currentOrder.id}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Date:</strong> {currentOrder.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {currentOrder.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Payment Method:</strong> {currentOrder.payment}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total:</strong> ₹{currentOrder.total.toFixed(2)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Customer Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {currentOrder.customer}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {currentOrder.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Shipping Address:</strong> 123 Main St, City, Country
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Phone:</strong> +1 (123) 456-7890
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Wireless Bluetooth Earbuds</TableCell>
                      <TableCell>₹49.99</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>₹49.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Smart Watch Series 5</TableCell>
                      <TableCell>₹199.99</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>₹199.99</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModals} variant="outlined">
            Close
          </Button>
          <Button variant="contained" startIcon={<PrintIcon />}>
            Print Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Order Modal */}
      <Dialog open={showEditModal} onClose={closeModals} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Order - {currentOrder?.id}
        </DialogTitle>
        <DialogContent>
          {currentOrder && (
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Order Status</InputLabel>
                    <Select
                      name="status"
                      value={currentOrder.status}
                      onChange={handleEditOrderChange}
                      label="Order Status"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="customer"
                    label="Customer Name"
                    value={currentOrder.customer}
                    onChange={handleEditOrderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Customer Email"
                    type="email"
                    value={currentOrder.email}
                    onChange={handleEditOrderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      name="payment"
                      value={currentOrder.payment}
                      onChange={handleEditOrderChange}
                      label="Payment Method"
                    >
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="PayPal">PayPal</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModals} variant="outlined">
            Cancel
          </Button>
          <Button onClick={updateOrder} variant="contained">
            Update Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Order Modal */}
      <Dialog open={showAddModal} onClose={closeModals} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="customer"
                  label="Customer Name"
                  value={newOrder.customer}
                  onChange={handleNewOrderChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Customer Email"
                  type="email"
                  value={newOrder.email}
                  onChange={handleNewOrderChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="total"
                  label="Total Amount"
                  type="number"
                  value={newOrder.total}
                  onChange={handleNewOrderChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="items"
                  label="Number of Items"
                  type="number"
                  value={newOrder.items}
                  onChange={handleNewOrderChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Order Status</InputLabel>
                  <Select
                    name="status"
                    value={newOrder.status}
                    onChange={handleNewOrderChange}
                    label="Order Status"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="payment"
                    value={newOrder.payment}
                    onChange={handleNewOrderChange}
                    label="Payment Method"
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="PayPal">PayPal</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModals} variant="outlined">
            Cancel
          </Button>
          <Button onClick={addOrder} variant="contained">
            Add Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Order Modal */}
      <Dialog open={showDeleteModal} onClose={closeModals} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          {currentOrder && (
            <Typography>
              Are you sure you want to delete order <strong>{currentOrder.id}</strong> for customer <strong>{currentOrder.customer}</strong>?
              <br />
              This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModals} variant="outlined">
            Cancel
          </Button>
          <Button onClick={deleteOrder} variant="contained" color="error">
            Delete Order
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminOrdersPage;



