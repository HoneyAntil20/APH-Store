import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../data/products';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import * as productService from '../../services/productService';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Sort as SortIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const AdminProductsPage = () => {
  // Initialize products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load products from API
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProducts();
      
      if (response.success) {
        // Map the products to the format needed for the admin table
        const formattedProducts = response.data.products.map(product => ({
          id: product._id,
          name: product.title,
          category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
          price: product.price,
          stock: product.stock,
          status: product.status || (product.stock > 10 ? 'Active' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'),
          description: product.description,
          image: product.image,
          originalPrice: product.originalPrice,
          discount: product.discount,
          features: product.features || []
        }));
        
        setProducts(formattedProducts);
        console.log('Loaded products data from API');
      } else {
        throw new Error('Failed to load products');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again.');
      
      // Fallback to local data if API fails
      try {
        const formattedProducts = productsData.products.map(product => ({
          id: product.id,
          name: product.title,
          category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
          price: product.price,
          stock: product.stock,
          status: product.status || (product.stock > 10 ? 'Active' : product.stock > 0 ? 'Low Stock' : 'Out of Stock')
        }));
        
        setProducts(formattedProducts);
        console.log('Loaded products data from fallback JSON file');
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    description: '',
    image: '',
    image2: '',
    features: '',
    additionalDetails: {
      color: '',
      size: ''
    },
    shipping: {
      freeShipping: false,
      deliveryDays: '3-5'
    }
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
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

  // Open add product modal
  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Open edit product modal
  const openEditModal = (product) => {
    // Ensure all fields are available for editing
    const productToEdit = {
      ...product,
      description: product.description || '',
      image: product.image || '',
      features: Array.isArray(product.features) ? product.features.join(', ') : (product.features || '')
    };
    setCurrentProduct(productToEdit);
    setShowEditModal(true);
  };

  // Open delete product modal
  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentProduct(null);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
      description: '',
      image: '',
      image2: '',
      features: '',
      additionalDetails: {
        color: '',
        size: ''
      },
      shipping: {
        freeShipping: false,
        deliveryDays: '3-5'
      }
    });
  };

  // Handle new product form change
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // Handle edit product form change
  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCurrentProduct({
        ...currentProduct,
        [parent]: {
          ...currentProduct[parent],
          [child]: value
        }
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        [name]: value
      });
    }
  };

  // Refresh products data from server
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Add new product
  const addProduct = async () => {
    // Validate form fields
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock || !newProduct.description || !newProduct.image) {
      // Display error message in the form instead of an alert
      const errorElement = document.getElementById('product-form-error');
      if (errorElement) {
        errorElement.innerText = 'Please fill in all required fields';
        errorElement.style.display = 'block';
      }
      return;
    }
    
    try {
      setLoading(true);
      
      const productData = {
        title: newProduct.name,
        category: newProduct.category.toLowerCase(),
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.price) * 1.2, // 20% markup
        discount: 0,
        stock: parseInt(newProduct.stock),
        description: newProduct.description,
        image: newProduct.image,
        images: [newProduct.image, newProduct.image2].filter(Boolean),
        features: newProduct.features ? newProduct.features.split(',').map(f => f.trim()) : []
      };
      
      const response = await productService.createProduct(productData);
      
      if (response.success) {
        console.log('Product created successfully:', response.data);
        await refreshProducts(); // Reload products from server
        closeModals();
      } else {
        throw new Error(response.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      const errorElement = document.getElementById('product-form-error');
      if (errorElement) {
        errorElement.innerText = error.message || 'Failed to create product. Please try again.';
        errorElement.style.display = 'block';
      }
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async () => {
    // Validate form fields
    if (!currentProduct.name || !currentProduct.category || !currentProduct.price || !currentProduct.stock) {
      // Display error message in the form instead of an alert
      const errorElement = document.getElementById('edit-form-error');
      if (errorElement) {
        errorElement.innerText = 'Please fill in all required fields';
        errorElement.style.display = 'block';
      }
      return;
    }
    
    try {
      setLoading(true);
      
      const productData = {
        title: currentProduct.name,
        category: currentProduct.category.toLowerCase(),
        price: parseFloat(currentProduct.price),
        stock: parseInt(currentProduct.stock),
        description: currentProduct.description,
        image: currentProduct.image,
        features: currentProduct.features ? currentProduct.features.split(',').map(f => f.trim()) : []
      };
      
      const response = await productService.updateProduct(currentProduct.id, productData);
      
      if (response.success) {
        console.log('Product updated successfully:', response.data);
        await refreshProducts(); // Reload products from server
        closeModals();
      } else {
        throw new Error(response.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      const errorElement = document.getElementById('edit-form-error');
      if (errorElement) {
        errorElement.innerText = error.message || 'Failed to update product. Please try again.';
        errorElement.style.display = 'block';
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    try {
      setLoading(true);
      
      const response = await productService.deleteProduct(currentProduct.id);
      
      if (response.success) {
        console.log('Product deleted successfully');
        await refreshProducts(); // Reload products from server
        closeModals();
      } else {
        throw new Error(response.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      (statusFilter === 'All' || product.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // Get unique categories for filter
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Get unique statuses for filter
  const statuses = ['All', ...new Set(products.map(product => product.status))];

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Products Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your product inventory
          </Typography>
        </Box>

        {/* Products Content */}
        <Paper elevation={2} sx={{ height: 'calc(100vh - 280px)' }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Products</Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="outlined" 
                  onClick={refreshProducts} 
                  startIcon={<RefreshIcon />}
                  disabled={loading}
                >
                  Refresh
                </Button>
                <Button 
                  variant="contained" 
                  onClick={openAddModal} 
                  startIcon={<AddIcon />}
                  disabled={loading}
                >
                  Add Product
                </Button>
              </Stack>
            </Box>

            {/* Error Display */}
            {error && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
                <Typography variant="body2">{error}</Typography>
              </Box>
            )}

            {/* Loading Display */}
            {loading && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'info.light', color: 'info.contrastText', borderRadius: 1 }}>
                <Typography variant="body2">Loading products...</Typography>
              </Box>
            )}

            {/* Filters */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                label="Search products..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ minWidth: 200 }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={handleCategoryFilter} label="Category">
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={handleStatusFilter} label="Status">
                  {statuses.map((status, index) => (
                    <MenuItem key={index} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Products Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort('id')} sx={{ cursor: 'pointer' }}>
                    ID <SortIcon />
                  </TableCell>
                  <TableCell onClick={() => handleSort('name')} sx={{ cursor: 'pointer' }}>
                    Product Name <SortIcon />
                  </TableCell>
                  <TableCell onClick={() => handleSort('category')} sx={{ cursor: 'pointer' }}>
                    Category <SortIcon />
                  </TableCell>
                  <TableCell onClick={() => handleSort('price')} sx={{ cursor: 'pointer' }}>
                    Price <SortIcon />
                  </TableCell>
                  <TableCell onClick={() => handleSort('stock')} sx={{ cursor: 'pointer' }}>
                    Stock <SortIcon />
                  </TableCell>
                  <TableCell onClick={() => handleSort('status')} sx={{ cursor: 'pointer' }}>
                    Status <SortIcon />
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Chip 
                        label={product.status} 
                        color={product.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" title="View">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          title="Edit"
                          onClick={() => openEditModal(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          title="Delete"
                          onClick={() => openDeleteModal(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <div id="product-form-error" className="form-error" style={{display: 'none', color: 'red', marginBottom: '15px'}}></div>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={newProduct.name} 
                  onChange={handleNewProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Product Image URL</label>
                <input 
                  type="text" 
                  id="image" 
                  name="image" 
                  value={newProduct.image} 
                  onChange={handleNewProductChange} 
                  required 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newProduct.description} 
                  onChange={handleNewProductChange} 
                  required 
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  value={newProduct.category} 
                  onChange={handleNewProductChange} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.filter(cat => cat !== 'All').map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  value={newProduct.price} 
                  onChange={handleNewProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input 
                  type="number" 
                  id="stock" 
                  name="stock" 
                  value={newProduct.stock} 
                  onChange={handleNewProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  name="status" 
                  value={newProduct.status} 
                  onChange={handleNewProductChange} 
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newProduct.description} 
                  onChange={handleNewProductChange} 
                  required 
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Primary Image URL</label>
                <input 
                  type="text" 
                  id="image" 
                  name="image" 
                  value={newProduct.image} 
                  onChange={handleNewProductChange} 
                  required 
                  placeholder="/assets/product-image.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image2">Secondary Image URL</label>
                <input 
                  type="text" 
                  id="image2" 
                  name="image2" 
                  value={newProduct.image2} 
                  onChange={handleNewProductChange} 
                  placeholder="/assets/product-image-2.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="features">Features (comma-separated)</label>
                <input 
                  type="text" 
                  id="features" 
                  name="features" 
                  value={newProduct.features} 
                  onChange={handleNewProductChange} 
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>Additional Details</h3>
              
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input 
                  type="text" 
                  id="color" 
                  name="additionalDetails.color" 
                  value={newProduct.additionalDetails.color} 
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      additionalDetails: {
                        ...newProduct.additionalDetails,
                        color: e.target.value
                      }
                    });
                  }} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="size">Size</label>
                <input 
                  type="text" 
                  id="size" 
                  name="additionalDetails.size" 
                  value={newProduct.additionalDetails.size} 
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      additionalDetails: {
                        ...newProduct.additionalDetails,
                        size: e.target.value
                      }
                    });
                  }} 
                />
              </div>
              
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>Shipping Options</h3>
              
              <div className="form-group">
                <label htmlFor="freeShipping">Free Shipping</label>
                <select
                  id="freeShipping"
                  name="shipping.freeShipping"
                  value={newProduct.shipping.freeShipping.toString()}
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      shipping: {
                        ...newProduct.shipping,
                        freeShipping: e.target.value === "true"
                      }
                    });
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="deliveryDays">Delivery Time (days)</label>
                <select
                  id="deliveryDays"
                  name="shipping.deliveryDays"
                  value={newProduct.shipping.deliveryDays}
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      shipping: {
                        ...newProduct.shipping,
                        deliveryDays: e.target.value
                      }
                    });
                  }}
                >
                  <option value="1-2">1-2 days</option>
                  <option value="3-5">3-5 days</option>
                  <option value="5-7">5-7 days</option>
                  <option value="7-10">7-10 days</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn" onClick={addProduct}>Add Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <div id="edit-form-error" className="form-error" style={{display: 'none', color: 'red', marginBottom: '15px'}}></div>
              <div className="form-group">
                <label htmlFor="edit-name">Product Name</label>
                <input 
                  type="text" 
                  id="edit-name" 
                  name="name" 
                  value={currentProduct.name} 
                  onChange={handleEditProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select 
                  id="edit-category" 
                  name="category" 
                  value={currentProduct.category} 
                  onChange={handleEditProductChange} 
                  required
                >
                  {categories.filter(cat => cat !== 'All').map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-price">Price</label>
                <input 
                  type="number" 
                  id="edit-price" 
                  name="price" 
                  value={currentProduct.price} 
                  onChange={handleEditProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-stock">Stock</label>
                <input 
                  type="number" 
                  id="edit-stock" 
                  name="stock" 
                  value={currentProduct.stock} 
                  onChange={handleEditProductChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-status">Status</label>
                <select 
                  id="edit-status" 
                  name="status" 
                  value={currentProduct.status} 
                  onChange={handleEditProductChange} 
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea 
                  id="edit-description" 
                  name="description" 
                  value={currentProduct.description || ''} 
                  onChange={handleEditProductChange} 
                  required 
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-image">Image URL</label>
                <input 
                  type="text" 
                  id="edit-image" 
                  name="image" 
                  value={currentProduct.image || ''} 
                  onChange={handleEditProductChange} 
                  required 
                  placeholder="/assets/product-image.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-features">Features (comma-separated)</label>
                <input 
                  type="text" 
                  id="edit-features" 
                  name="features" 
                  value={currentProduct.features || ''} 
                  onChange={handleEditProductChange} 
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn" onClick={updateProduct}>Update Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {showDeleteModal && currentProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Delete Product</h2>
              <button className="modal-close" onClick={closeModals}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the product "{currentProduct.name}"?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={closeModals}>Cancel</button>
              <button className="btn delete" onClick={deleteProduct}>Delete</button>
            </div>
          </div>
        </div>
      )}
      </Box>
    </AdminLayout>
  );
};

export default AdminProductsPage;