import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faEdit, 
  faSearch, 
  faFilter, 
  faDownload,
  faExclamationTriangle,
  faCheckCircle,
  faSpinner,
  faEye,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { getCartItems, removeCartItem } from '../../services/cartService';
import AdminLayout from '../../components/admin/AdminLayout';
import '../../styles/admin/AdminTables.css';
import '../../styles/admin/AdminPageHeader.css';
import '../../styles/admin/Modal.css';
import '../../styles/admin/ProductCell.css';
import '../../styles/Notification.css';
import '../../styles/Loading.css';

const AdminCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterBy, setFilterBy] = useState('all');

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const items = await getCartItems();
      
      if (!Array.isArray(items)) {
        console.error('Invalid cart items data:', items);
        setCartItems([]);
        setLoading(false);
        showNotification('Failed to load cart items: Invalid data format', 'error');
        return;
      }
      
      // Fetch product details for each cart item
      const itemsWithDetails = await Promise.all(items.map(async (item) => {
        if (!item || !item.productId) {
          console.error('Invalid cart item:', item);
          return {
            ...item,
            productTitle: 'Unknown Product',
            productImage: '/assets/images/placeholder-image.jpg'
          };
        }
        
        try {
          // Fetch product details from API
          const response = await fetch(`http://localhost:5001/api/products/${item.productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          const productData = await response.json();
          
          // Handle different API response structures
          let title = 'Product ' + item.productId;
          let image = '/assets/images/placeholder-image.jpg';
          
          if (productData && productData.data) {
            title = productData.data.title || title;
            image = productData.data.image || 
                   (productData.data.images && productData.data.images.length > 0 ? 
                    productData.data.images[0] : image);
          } else if (productData) {
            title = productData.title || title;
            image = productData.image || 
                   (productData.images && productData.images.length > 0 ? 
                    productData.images[0] : image);
          }
          
          return {
            ...item,
            productTitle: title,
            productImage: image
          };
        } catch (error) {
          console.error(`Error fetching details for product ${item.productId}:`, error);
          return {
            ...item,
            productTitle: `Product ${item.productId}`,
            productImage: '/assets/images/placeholder-image.jpg'
          };
        }
      }));
      
      setCartItems(itemsWithDetails.filter(item => item !== null));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]);
      setLoading(false);
      showNotification('Failed to load cart items: ' + (error.message || 'Unknown error'), 'error');
    }
  };

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle remove cart item
  const handleRemoveItem = async (id) => {
    try {
      await removeCartItem(id);
      // Refresh cart items
      fetchCartItems();
      showNotification('Cart item removed successfully', 'success');
    } catch (error) {
      console.error('Error removing cart item:', error);
      showNotification('Failed to remove cart item', 'error');
    }
  };
  
  // Handle view item details
  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Get unique customer IDs for filtering
  const uniqueCustomerIds = [...new Set(cartItems.map(item => item.customerId))];
  
  // Filter cart items based on search term and filter selection
  const filteredCartItems = cartItems.filter(item => {
    // First apply customer filter if not "all"
    if (filterBy !== 'all' && item.customerId !== filterBy) {
      return false;
    }
    
    // Then apply search term filter
    return (
      item.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId.toString().includes(searchTerm)
    );
  });

  // Export cart data as CSV
  const exportCSV = () => {
    const headers = ['ID', 'Customer ID', 'Product ID', 'Product Title', 'Price (₹)', 'Quantity', 'Total (₹)', 'Date Added'];
    const csvData = [
      headers.join(','),
      ...filteredCartItems.map(item => [
        item.id,
        item.customerId,
        item.productId,
        item.productTitle ? `"${item.productTitle.replace(/"/g, '""')}"` : `Product ${item.productId}`,
        item.price.toFixed(2),
        item.quantity,
        (item.price * item.quantity).toFixed(2),
        new Date(parseInt(item.id)).toLocaleString()
      ].join(','))
    ].join('\\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'cart_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <FontAwesomeIcon 
            icon={notification.type === 'success' ? faCheckCircle : faExclamationTriangle} 
          />
          <span>{notification.message}</span>
        </div>
      )}
      
      <div className="admin-page-header">
        <h1>Cart Management</h1>
        <div className="admin-actions">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="Search by customer or product ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <label htmlFor="customerFilter">Filter by Customer: </label>
            <select 
              id="customerFilter" 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Customers</option>
              {uniqueCustomerIds.map(customerId => (
                <option key={customerId} value={customerId}>
                  {customerId}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-outline" onClick={exportCSV}>
            <FontAwesomeIcon icon={faDownload} /> Export CSV
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading cart data...</span>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Product</th>
                <th>Product ID</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCartItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">No cart items found</td>
                </tr>
              ) : (
                filteredCartItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.customerId}</td>
                    <td className="product-cell">
                      {item.productImage && (
                        <img 
                          src={item.productImage} 
                          alt={item.productTitle || `Product ${item.productId}`} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      )}
                      <span>{item.productTitle || `Product ${item.productId}`}</span>
                    </td>
                    <td>{item.productId}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon view" 
                          onClick={() => handleViewItem(item)}
                          title="View Details"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleRemoveItem(item.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="admin-summary">
        <div className="summary-card">
          <h3>Total Cart Items</h3>
          <p>{filteredCartItems.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Value</h3>
          <p>₹{filteredCartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Average Order Value</h3>
          <p>
            ₹{filteredCartItems.length > 0 
              ? (filteredCartItems.reduce((total, item) => total + (item.price * item.quantity), 0) / 
                 [...new Set(filteredCartItems.map(item => item.customerId))].length).toFixed(2)
              : '0.00'
            }
          </p>
        </div>
      </div>
      
      {/* Item Details Modal */}
      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cart Item Details</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{selectedItem.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Customer ID:</span>
                <span className="detail-value">{selectedItem.customerId}</span>
              </div>
              {selectedItem.productImage && (
                <div className="detail-row">
                  <span className="detail-label">Product Image:</span>
                  <span className="detail-value">
                    <img 
                      src={selectedItem.productImage} 
                      alt={selectedItem.productTitle || `Product ${selectedItem.productId}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Product Title:</span>
                <span className="detail-value">{selectedItem.productTitle || `Product ${selectedItem.productId}`}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Product ID:</span>
                <span className="detail-value">{selectedItem.productId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Price:</span>
                <span className="detail-value">₹{selectedItem.price.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">{selectedItem.quantity}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total:</span>
                <span className="detail-value">₹{(selectedItem.price * selectedItem.quantity).toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Added On:</span>
                <span className="detail-value">{new Date(parseInt(selectedItem.id)).toLocaleString()}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={closeModal}>Close</button>
              <button 
                className="btn-danger" 
                onClick={() => {
                  handleRemoveItem(selectedItem.id);
                  closeModal();
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default AdminCartPage;
