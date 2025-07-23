const localDB = require('../config/localDB');

class LocalProduct {
  constructor() {
    this.collection = 'products';
  }

  async find(filter = {}) {
    return localDB.findAll(this.collection, filter);
  }

  async findById(id) {
    return localDB.findById(this.collection, id);
  }

  async create(productData) {
    return localDB.create(this.collection, productData);
  }

  async findByIdAndUpdate(id, updates) {
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
    const { limit = 12, skip = 0, sort = {} } = options;
    let products = localDB.findAll(this.collection, filter);
    
    // Apply sorting
    if (Object.keys(sort).length > 0) {
      const sortKey = Object.keys(sort)[0];
      const sortOrder = sort[sortKey];
      products.sort((a, b) => {
        if (sortOrder === 1) {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const paginatedProducts = products.slice(skip, skip + limit);
    
    return paginatedProducts;
  }

  // Initialize with sample data if empty
  async initializeSampleData() {
    const existingProducts = await this.find();
    if (existingProducts.length === 0) {
      const sampleProducts = [
        {
          title: "Premium Wireless Headphones",
          price: 199.99,
          originalPrice: 249.99,
          discount: 20,
          description: "High-quality wireless headphones with noise cancellation",
          features: ["Noise Cancellation", "30-hour battery", "Bluetooth 5.0"],
          images: ["/assets/headphones1.jpg", "/assets/headphones2.jpg"],
          image: "/assets/headphones1.jpg",
          category: "Electronics",
          stock: 50,
          rating: 4.5,
          reviewCount: 128,
          reviews: []
        },
        {
          title: "Smart Fitness Watch",
          price: 299.99,
          originalPrice: 399.99,
          discount: 25,
          description: "Advanced fitness tracking with heart rate monitor",
          features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day battery"],
          images: ["/assets/watch1.jpg", "/assets/watch2.jpg"],
          image: "/assets/watch1.jpg",
          category: "Electronics",
          stock: 30,
          rating: 4.7,
          reviewCount: 89,
          reviews: []
        },
        {
          title: "Organic Cotton T-Shirt",
          price: 29.99,
          originalPrice: 39.99,
          discount: 25,
          description: "Comfortable organic cotton t-shirt in various colors",
          features: ["100% Organic Cotton", "Machine Washable", "Available in 5 colors"],
          images: ["/assets/tshirt1.jpg", "/assets/tshirt2.jpg"],
          image: "/assets/tshirt1.jpg",
          category: "Clothing",
          stock: 100,
          rating: 4.3,
          reviewCount: 45,
          reviews: []
        },
        {
          title: "Professional Camera Lens",
          price: 899.99,
          originalPrice: 1199.99,
          discount: 25,
          description: "Professional 85mm f/1.4 portrait lens",
          features: ["85mm focal length", "f/1.4 aperture", "Weather sealed"],
          images: ["/assets/lens1.jpg", "/assets/lens2.jpg"],
          image: "/assets/lens1.jpg",
          category: "Photography",
          stock: 15,
          rating: 4.9,
          reviewCount: 67,
          reviews: []
        },
        {
          title: "Gaming Mechanical Keyboard",
          price: 149.99,
          originalPrice: 199.99,
          discount: 25,
          description: "RGB mechanical gaming keyboard with blue switches",
          features: ["Mechanical Blue Switches", "RGB Backlighting", "Programmable Keys"],
          images: ["/assets/keyboard1.jpg", "/assets/keyboard2.jpg"],
          image: "/assets/keyboard1.jpg",
          category: "Electronics",
          stock: 25,
          rating: 4.6,
          reviewCount: 156,
          reviews: []
        }
      ];

      for (const product of sampleProducts) {
        await this.create(product);
      }
      
      console.log('Sample products initialized');
    }
  }
}

module.exports = new LocalProduct();