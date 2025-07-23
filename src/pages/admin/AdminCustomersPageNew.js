import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
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
  IconButton,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import { userAPI } from '../../services/api';

const AdminCustomersPageNew = () => {
  // State management
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  
  // Form state for new customer
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    isAdmin: false
  });

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      
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

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
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

  // Modal handlers
  const openAddModal = () => {
    setError('');
    setSuccess('');
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      status: 'active',
      isAdmin: false
    });
    setShowAddModal(true);
  };

  const openEditModal = (customer) => {
    setCurrentCustomer({ ...customer });
    setShowEditModal(true);
  };

  const openViewModal = (customer) => {
    setCurrentCustomer(customer);
    setShowViewModal(true);
  };

  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setCurrentCustomer(null);
    setError('');
  };

  // Form handlers
  const handleNewCustomerChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditCustomerChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentCustomer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new customer
  const addCustomer = async () => {
    try {
      // Validate required fields
      if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
        setError('Please fill in all required fields');
        return;
      }

      console.log('Adding customer:', newCustomer);
      
      // Add default password since we removed the password field
      const customerData = {
        ...newCustomer,
        password: 'defaultPassword123'
      };
      
      const result = await userAPI.createUser(customerData);
      console.log('Customer created successfully:', result);
      
      setSuccess('Customer added successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      await fetchCustomers();
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error adding customer:', err);
    }
  };

  // Update customer
  const updateCustomer = async () => {
    try {
      if (!currentCustomer.name || !currentCustomer.email || !currentCustomer.phone) {
        setError('Please fill in all required fields');
        return;
      }

      const result = await userAPI.updateUser(currentCustomer._id || currentCustomer.id, currentCustomer);
      console.log('Customer updated successfully:', result);
      
      setSuccess('Customer updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      await fetchCustomers();
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error updating customer:', err);
    }
  };

  // Delete customer
  const deleteCustomer = async () => {
    try {
      await userAPI.deleteUser(currentCustomer._id || currentCustomer.id);
      
      setSuccess('Customer deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      await fetchCustomers();
      closeModals();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting customer:', err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-page-container">
        {/* Page Header */}
        <div className="admin-page-header">
          <h1 className="admin-page-title">Customers Management</h1>
          <p className="admin-page-subtitle">Manage your customer base</p>
        </div>

        {/* Content Area */}
        <div className="admin-content-area">
          {/* Content Header */}
          <div className="admin-content-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant="h6">Customers</Typography>
              <div className="admin-actions">
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={fetchCustomers}
                  disabled={loading}
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={openAddModal}
                >
                  Add Customer
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="admin-filters">
              <div className="admin-search">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <select
                className="admin-select"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Alerts */}
            {error && (
              <div className="admin-alert admin-alert-error">
                {error}
              </div>
            )}
            
            {success && (
              <div className="admin-alert admin-alert-success">
                {success}
              </div>
            )}
          </div>

          {/* Content Body - Table */}
          <div className="admin-content-body">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('_id')} style={{ cursor: 'pointer' }}>
                      ID
                    </th>
                    <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                      Name
                    </th>
                    <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                      Email
                    </th>
                    <th onClick={() => handleSort('phone')} style={{ cursor: 'pointer' }}>
                      Phone
                    </th>
                    <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                      Status
                    </th>
                    <th onClick={() => handleSort('isAdmin')} style={{ cursor: 'pointer' }}>
                      Role
                    </th>
                    <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
                      Join Date
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                        <div className="admin-empty-state">
                          <h3>No customers found</h3>
                          <p>Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedCustomers.map((customer, index) => (
                      <tr key={customer._id || customer.id || index}>
                        <td>{customer._id || customer.id || 'N/A'}</td>
                        <td>{customer.name || 'N/A'}</td>
                        <td>{customer.email || 'N/A'}</td>
                        <td>{customer.phone || 'N/A'}</td>
                        <td>
                          <span className={`admin-status ${customer.status === 'active' ? 'active' : 'inactive'}`}>
                            {customer.status || 'active'}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-role ${customer.isAdmin ? 'admin' : 'customer'}`}>
                            {customer.isAdmin ? 'Admin' : 'Customer'}
                          </span>
                        </td>
                        <td>
                          {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              className="admin-btn admin-btn-outline"
                              onClick={() => openViewModal(customer)}
                              title="View"
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                            <button
                              className="admin-btn admin-btn-outline"
                              onClick={() => openEditModal(customer)}
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </button>
                            <button
                              className="admin-btn admin-btn-outline"
                              onClick={() => openDeleteModal(customer)}
                              title="Delete"
                              style={{ color: '#dc2626' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Customer Modal */}
        <Dialog open={showAddModal} onClose={closeModals} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleNewCustomerChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={handleNewCustomerChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleNewCustomerChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newCustomer.status}
                    onChange={handleNewCustomerChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModals}>Cancel</Button>
            <Button onClick={addCustomer} variant="contained">Add Customer</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Customer Modal */}
        <Dialog open={showEditModal} onClose={closeModals} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            {currentCustomer && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={currentCustomer.name || ''}
                    onChange={handleEditCustomerChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={currentCustomer.email || ''}
                    onChange={handleEditCustomerChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={currentCustomer.phone || ''}
                    onChange={handleEditCustomerChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={currentCustomer.status || 'active'}
                      onChange={handleEditCustomerChange}
                      label="Status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModals}>Cancel</Button>
            <Button onClick={updateCustomer} variant="contained">Update Customer</Button>
          </DialogActions>
        </Dialog>

        {/* View Customer Modal */}
        <Dialog open={showViewModal} onClose={closeModals} maxWidth="sm" fullWidth>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogContent>
            {currentCustomer && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"><strong>ID:</strong> {currentCustomer._id || currentCustomer.id}</Typography>
                <Typography variant="body1"><strong>Name:</strong> {currentCustomer.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {currentCustomer.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {currentCustomer.phone}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {currentCustomer.status || 'active'}</Typography>
                <Typography variant="body1"><strong>Role:</strong> {currentCustomer.isAdmin ? 'Admin' : 'Customer'}</Typography>
                <Typography variant="body1"><strong>Join Date:</strong> {currentCustomer.createdAt ? new Date(currentCustomer.createdAt).toLocaleDateString() : 'N/A'}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModals}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Customer Modal */}
        <Dialog open={showDeleteModal} onClose={closeModals} maxWidth="sm" fullWidth>
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogContent>
            {currentCustomer && (
              <Typography>
                Are you sure you want to delete customer "{currentCustomer.name}"? This action cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModals}>Cancel</Button>
            <Button onClick={deleteCustomer} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomersPageNew;