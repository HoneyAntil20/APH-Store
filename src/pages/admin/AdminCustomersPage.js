import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faShoppingCart, 
  faUsers, 
  faBoxes, 
  faChartLine, 
  faSignOutAlt, 
  faUserCircle, 
  faBell, 
  faEnvelope, 
  faSearch, 
  faFilter, 
  faSort, 
  faEye, 
  faEdit, 
  faTrash, 
  faUserPlus,
  faShoppingBasket
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Box,
  Container,
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
  Chip,
  TextField,
  Stack,
  Divider,
  IconButton,
  Avatar,
  Badge,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  ListItemAvatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Analytics as AnalyticsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  ShoppingBasket as ShoppingBasketIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { userAPI } = await import('../../services/api');
      const data = await userAPI.getUsers();
      console.log('Fetched customers data:', data);
      setCustomers(data.data?.users || data.users || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Define status options
  const statuses = ['All', 'active', 'inactive'];

  // Filter and sort customers (keeping this for backward compatibility)
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = (customer.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

    // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentCart, setCurrentCart] = useState(null);

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
    status: 'active',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  // Fetch customer cart details
  const fetchCustomerCart = async (userId) => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const response = await fetch(`/api/cart/admin/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${adminData.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart details');
      }

      const data = await response.json();
      setCurrentCart(data.data.cart);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
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

  // Open view customer modal
  const openViewModal = (customer) => {
    setCurrentCustomer(customer);
    setShowViewModal(true);
  };

  // Open cart modal
  const openCartModal = async (customer) => {
    setCurrentCustomer(customer);
    await fetchCustomerCart(customer._id);
    setShowCartModal(true);
  };

  // Open edit customer modal
  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setShowEditModal(true);
  };

  // Open delete customer modal
  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setShowDeleteModal(true);
  };

  // Open add customer modal
  const openAddModal = () => {
    setError(''); // Clear any existing errors
    setSuccess(''); // Clear any existing success messages
    setShowAddModal(true);
  };

  // Close modals
  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowCartModal(false);
    setCurrentCustomer(null);
    setCurrentCart(null);
    setNewCustomer({
      name: '',
      email: '',
      password: '',
      phone: '',
      isAdmin: false,
      status: 'active',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }
    });
  };

  // Handle new customer form change
  const handleNewCustomerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewCustomer({
        ...newCustomer,
        [parent]: {
          ...newCustomer[parent],
          [child]: value
        }
      });
    } else {
      setNewCustomer({
        ...newCustomer,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle edit customer form change
  const handleEditCustomerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCurrentCustomer({
        ...currentCustomer,
        [parent]: {
          ...currentCustomer[parent],
          [child]: value
        }
      });
    } else {
      setCurrentCustomer({
        ...currentCustomer,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Add new customer
  const addCustomer = async () => {
    try {
      // Validate required fields
      if (!newCustomer.name || !newCustomer.email || !newCustomer.password || !newCustomer.phone) {
        setError('Please fill in all required fields');
        return;
      }

      if (newCustomer.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      console.log('Adding customer:', newCustomer);
      
      const { userAPI } = await import('../../services/api');
      const result = await userAPI.createUser(newCustomer);
      console.log('Customer created successfully:', result);
      
      setSuccess('Customer added successfully!');
      setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
      
      await fetchCustomers(); // Refresh the list
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error adding customer:', err);
    }
  };

  // Update customer
  const updateCustomer = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const response = await fetch(`/api/users/${currentCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentCustomer)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update customer');
      }

      await fetchCustomers(); // Refresh the list
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error updating customer:', err);
    }
  };

  // Delete customer
  const deleteCustomer = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const response = await fetch(`/api/users/${currentCustomer._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminData.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete customer');
      }

      await fetchCustomers(); // Refresh the list
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting customer:', err);
    }
  };

  // Clear customer cart
  const clearCustomerCart = async (userId) => {
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const response = await fetch(`/api/cart/admin/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminData.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear cart');
      }

      // Refresh cart data
      await fetchCustomerCart(userId);
      await fetchCustomers(); // Refresh customer list to update cart stats
    } catch (err) {
      setError(err.message);
      console.error('Error clearing cart:', err);
    }
  };

  // Filter and sort customers
  const filteredAndSortedCustomers = customers
    .filter(customer => {
      const matchesSearch = (customer.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || (customer.status || 'active') === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'cartTotal') {
        aValue = a.cart?.totalAmount || 0;
        bValue = b.cart?.totalAmount || 0;
      } else if (sortField === 'cartItems') {
        aValue = a.cart?.totalItems || 0;
        bValue = b.cart?.totalItems || 0;
      }
      
      // Handle null/undefined values
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ width: '100%', height: '100%' }}>
        {/* Page Header */}
        <Box sx={{ mb: 3, p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Customers Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your customer base
          </Typography>
        </Box>

        {/* Customers Content */}
        <Paper elevation={2} sx={{ height: 'calc(100vh - 280px)' }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Customers</Typography>
              <Button variant="contained" onClick={openAddModal} startIcon={<FontAwesomeIcon icon={faUserPlus} />}>
                Add Customer
              </Button>
            </Box>

            {/* Filters */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                label="Search customers..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ minWidth: 200 }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={handleStatusFilter} label="Status">
                  {statuses.map((status, index) => (
                    <MenuItem key={index} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
          </Box>

          {/* Customers Table */}
          <TableContainer sx={{ height: 'calc(100% - 200px)', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort('_id')} sx={{ cursor: 'pointer' }}>
                    ID <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('name')} sx={{ cursor: 'pointer' }}>
                    Name <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('email')} sx={{ cursor: 'pointer' }}>
                    Email <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('phone')} sx={{ cursor: 'pointer' }}>
                    Phone <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('status')} sx={{ cursor: 'pointer' }}>
                    Status <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('isAdmin')} sx={{ cursor: 'pointer' }}>
                    Role <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell onClick={() => handleSort('createdAt')} sx={{ cursor: 'pointer' }}>
                    Join Date <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No customers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedCustomers.map((customer, index) => (
                    <TableRow key={customer._id || customer.id || index}>
                      <TableCell>{customer._id || customer.id || 'N/A'}</TableCell>
                      <TableCell>{customer.name || 'N/A'}</TableCell>
                      <TableCell>{customer.email || 'N/A'}</TableCell>
                      <TableCell>{customer.phone || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={customer.status || 'active'} 
                          color={customer.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={customer.isAdmin ? 'Admin' : 'Customer'} 
                          color={customer.isAdmin ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            title="View"
                            onClick={() => openViewModal(customer)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            title="Edit"
                            onClick={() => openEditModal(customer)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            title="Delete"
                            onClick={() => openDeleteModal(customer)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
      </Box>

      {/* View Customer Modal */}
      {showViewModal && currentCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Customer Details</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="customer-details">
                <div className="customer-avatar">
                  <FontAwesomeIcon icon={faUserCircle} size="5x" />
                </div>
                <div className="customer-info">
                  <h3>{currentCustomer.name}</h3>
                  <p><strong>Email:</strong> {currentCustomer.email}</p>
                  <p><strong>Phone:</strong> {currentCustomer.phone}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${currentCustomer.status.toLowerCase()}`}>
                      {currentCustomer.status}
                    </span>
                  </p>
                  <p><strong>Join Date:</strong> {currentCustomer.joinDate}</p>
                  <p><strong>Total Orders:</strong> {currentCustomer.orders}</p>
                  <p><strong>Total Spent:</strong> ₹{currentCustomer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="customer-addresses">
                <h3>Addresses</h3>
                <div className="address-card">
                  <h4>Shipping Address</h4>
                  <p>123 Main Street, Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                <div className="address-card">
                  <h4>Billing Address</h4>
                  <p>123 Main Street, Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
              
              <div className="customer-recent-orders">
                <h3>Recent Orders</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ORD-12345</td>
                      <td>2023-07-10</td>
                      <td>$249.99</td>
                      <td>
                        <span className="status-badge delivered">Delivered</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ORD-12346</td>
                      <td>2023-06-25</td>
                      <td>$129.50</td>
                      <td>
                        <span className="status-badge delivered">Delivered</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ORD-12347</td>
                      <td>2023-05-18</td>
                      <td>$399.95</td>
                      <td>
                        <span className="status-badge delivered">Delivered</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Close</button>
              <button 
                className="btn" 
                onClick={() => {
                  closeModals();
                  openEditModal(currentCustomer);
                }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && currentCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Customer</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={currentCustomer.name} 
                  onChange={handleEditCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={currentCustomer.email} 
                  onChange={handleEditCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone" 
                  value={currentCustomer.phone} 
                  onChange={handleEditCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  name="status" 
                  value={currentCustomer.status} 
                  onChange={handleEditCustomerChange} 
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn" onClick={updateCustomer}>Update Customer</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Customer Modal */}
      {showDeleteModal && currentCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Delete Customer</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the customer "{currentCustomer.name}"?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn delete" onClick={deleteCustomer}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Customer</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="new-name">Name</label>
                <input 
                  type="text" 
                  id="new-name" 
                  name="name" 
                  value={newCustomer.name} 
                  onChange={handleNewCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-email">Email</label>
                <input 
                  type="email" 
                  id="new-email" 
                  name="email" 
                  value={newCustomer.email} 
                  onChange={handleNewCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input 
                  type="password" 
                  id="new-password" 
                  name="password" 
                  value={newCustomer.password} 
                  onChange={handleNewCustomerChange} 
                  required 
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-phone">Phone</label>
                <input 
                  type="text" 
                  id="new-phone" 
                  name="phone" 
                  value={newCustomer.phone} 
                  onChange={handleNewCustomerChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-status">Status</label>
                <select 
                  id="new-status" 
                  name="status" 
                  value={newCustomer.status} 
                  onChange={handleNewCustomerChange} 
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn" onClick={addCustomer}>Add Customer</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCustomersPage;

