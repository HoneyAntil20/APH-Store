const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB or initialize local DB
connectDB();

// Initialize local database with sample data if using local storage
if (process.env.USE_LOCAL_DB === 'true') {
  const LocalProduct = require('./models/localProductModel');
  LocalProduct.initializeSampleData();
}

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files
app.use(express.static('public'));

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to APH Store API',
    database: process.env.USE_LOCAL_DB === 'true' ? 'Local JSON Database' : 'MongoDB',
    status: 'Server is running successfully'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    database: process.env.USE_LOCAL_DB === 'true' ? 'Local JSON Database' : 'MongoDB',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${process.env.USE_LOCAL_DB === 'true' ? 'Local JSON Database' : 'MongoDB'}`);
});