const localDB = require('../config/localDB');
const bcrypt = require('bcryptjs');

class LocalUser {
  constructor() {
    this.collection = 'users';
  }

  async find(filter = {}) {
    return localDB.findAll(this.collection, filter);
  }

  async findById(id) {
    return localDB.findById(this.collection, id);
  }

  async findByEmail(email) {
    const users = await this.find();
    return users.find(user => user.email === email);
  }

  async create(userData) {
    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Set default values
    const newUser = {
      ...userData,
      isAdmin: userData.isAdmin || false,
      status: userData.status || 'active',
      cart: userData.cart || {
        items: [],
        totalAmount: 0,
        totalItems: 0
      },
      orderHistory: userData.orderHistory || []
    };

    return localDB.create(this.collection, newUser);
  }

  async findByIdAndUpdate(id, updates) {
    // Hash password if being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    return localDB.updateById(this.collection, id, updates);
  }

  async findByIdAndDelete(id) {
    return localDB.deleteById(this.collection, id);
  }

  async countDocuments(filter = {}) {
    return localDB.count(this.collection, filter);
  }

  // Pagination support
  async findWithPagination(filter = {}, options = {}) {
    const { limit = 10, skip = 0, sort = {} } = options;
    let users = localDB.findAll(this.collection, filter);
    
    // Apply sorting
    if (Object.keys(sort).length > 0) {
      const sortKey = Object.keys(sort)[0];
      const sortOrder = sort[sortKey];
      users.sort((a, b) => {
        if (sortOrder === 1) {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const paginatedUsers = users.slice(skip, skip + limit);
    
    return paginatedUsers;
  }

  // Cart operations
  async addToCart(userId, cartItem) {
    const user = await this.findById(userId);
    if (!user) return null;

    const existingItemIndex = user.cart.items.findIndex(
      item => item.productId === cartItem.productId
    );

    if (existingItemIndex > -1) {
      // Update existing item
      user.cart.items[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Add new item
      user.cart.items.push({
        ...cartItem,
        addedAt: new Date().toISOString()
      });
    }

    // Recalculate totals
    user.cart.totalItems = user.cart.items.reduce((total, item) => total + item.quantity, 0);
    user.cart.totalAmount = user.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return this.findByIdAndUpdate(userId, { cart: user.cart });
  }

  async removeFromCart(userId, productId) {
    const user = await this.findById(userId);
    if (!user) return null;

    user.cart.items = user.cart.items.filter(item => item.productId !== productId);

    // Recalculate totals
    user.cart.totalItems = user.cart.items.reduce((total, item) => total + item.quantity, 0);
    user.cart.totalAmount = user.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return this.findByIdAndUpdate(userId, { cart: user.cart });
  }

  async updateCartItem(userId, productId, quantity) {
    const user = await this.findById(userId);
    if (!user) return null;

    const itemIndex = user.cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) return null;

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      user.cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      user.cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate totals
    user.cart.totalItems = user.cart.items.reduce((total, item) => total + item.quantity, 0);
    user.cart.totalAmount = user.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return this.findByIdAndUpdate(userId, { cart: user.cart });
  }

  async clearCart(userId) {
    const user = await this.findById(userId);
    if (!user) return null;

    const emptyCart = {
      items: [],
      totalAmount: 0,
      totalItems: 0
    };

    return this.findByIdAndUpdate(userId, { cart: emptyCart });
  }

  // Password comparison
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Initialize with sample data if empty
  async initializeSampleData() {
    const existingUsers = await this.find();
    if (existingUsers.length === 0) {
      console.log('Initializing sample users...');
      // Sample data will be loaded from users.json file automatically
    }
  }
}

module.exports = new LocalUser();