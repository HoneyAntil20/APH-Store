// Products data for the APH Store
const products = [
  {
    "_id": "1752832385164pgmsnkeht",
    "title": "Premium Wireless Headphones",
    "price": 199.99,
    "originalPrice": 249.99,
    "discount": 20,
    "description": "High-quality wireless headphones with noise cancellation",
    "features": [
      "Noise Cancellation",
      "30-hour battery",
      "Bluetooth 5.0"
    ],
    "images": [
      "/assets/headphones1.jpg",
      "/assets/headphones2.jpg"
    ],
    "image": "/assets/headphones1.jpg",
    "category": "electronics",
    "stock": 50,
    "rating": 4.5,
    "reviewCount": 128,
    "reviews": [],
    "createdAt": "2025-07-18T09:53:05.164Z",
    "updatedAt": "2025-07-18T09:53:05.165Z"
  },
  {
    "_id": "17528323851662m3zko36g",
    "title": "Smart Fitness Watch",
    "price": 299.99,
    "originalPrice": 399.99,
    "discount": 25,
    "description": "Advanced fitness tracking with heart rate monitor",
    "features": [
      "Heart Rate Monitor",
      "GPS",
      "Water Resistant",
      "7-day battery"
    ],
    "images": [
      "/assets/watch1.jpg",
      "/assets/watch2.jpg"
    ],
    "image": "/assets/watch1.jpg",
    "category": "electronics",
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 89,
    "reviews": [],
    "createdAt": "2025-07-18T09:53:05.166Z",
    "updatedAt": "2025-07-18T09:53:05.166Z"
  },
  {
    "_id": "1752832385167nb9qdxpgj",
    "title": "Organic Cotton T-Shirt",
    "price": 29.99,
    "originalPrice": 39.99,
    "discount": 25,
    "description": "Comfortable organic cotton t-shirt in various colors",
    "features": [
      "100% Organic Cotton",
      "Machine Washable",
      "Available in 5 colors"
    ],
    "images": [
      "/assets/tshirt1.jpg",
      "/assets/tshirt2.jpg"
    ],
    "image": "/assets/tshirt1.jpg",
    "category": "fashion",
    "stock": 100,
    "rating": 4.3,
    "reviewCount": 45,
    "reviews": [],
    "createdAt": "2025-07-18T09:53:05.167Z",
    "updatedAt": "2025-07-18T09:53:05.167Z"
  },
  {
    "_id": "1752832385167kjoafkpwp",
    "title": "Professional Camera Lens",
    "price": 899.99,
    "originalPrice": 1199.99,
    "discount": 25,
    "description": "Professional 85mm f/1.4 portrait lens",
    "features": [
      "85mm focal length",
      "f/1.4 aperture",
      "Weather sealed"
    ],
    "images": [
      "/assets/lens1.jpg",
      "/assets/lens2.jpg"
    ],
    "image": "/assets/lens1.jpg",
    "category": "electronics",
    "stock": 15,
    "rating": 4.9,
    "reviewCount": 67,
    "reviews": [],
    "createdAt": "2025-07-18T09:53:05.167Z",
    "updatedAt": "2025-07-18T09:53:05.167Z"
  },
  {
    "_id": "1752832385168ptqpj3k4b",
    "title": "Gaming Mechanical Keyboard",
    "price": 149.99,
    "originalPrice": 199.99,
    "discount": 25,
    "description": "RGB mechanical gaming keyboard with blue switches",
    "features": [
      "Mechanical Blue Switches",
      "RGB Backlighting",
      "Programmable Keys"
    ],
    "images": [
      "/assets/keyboard1.jpg",
      "/assets/keyboard2.jpg"
    ],
    "image": "/assets/keyboard1.jpg",
    "category": "electronics",
    "stock": 25,
    "rating": 4.6,
    "reviewCount": 156,
    "reviews": [],
    "createdAt": "2025-07-18T09:53:05.168Z",
    "updatedAt": "2025-07-18T09:53:05.168Z"
  },
  {
    "_id": "1752832690961z8y7n1r81",
    "title": "Test API Product",
    "price": 49.99,
    "originalPrice": 69.99,
    "discount": 29,
    "description": "Created via API test",
    "features": [
      "API Created",
      "Test Product"
    ],
    "image": "/assets/test.jpg",
    "category": "electronics",
    "stock": 10,
    "rating": 0,
    "reviewCount": 0,
    "reviews": [],
    "user": "local-admin",
    "createdAt": "2025-07-18T09:58:10.961Z",
    "updatedAt": "2025-07-18T09:58:10.962Z"
  },
  {
    "_id": "1752833085947djf162qc1",
    "title": "Website Integration Test",
    "price": 25.99,
    "originalPrice": 35.99,
    "discount": 28,
    "description": "Product created to test website integration",
    "features": [
      "Website Integration",
      "Live Test"
    ],
    "image": "/assets/integration-test.jpg",
    "category": "electronics",
    "stock": 5,
    "rating": 0,
    "reviewCount": 0,
    "reviews": [],
    "user": "local-admin",
    "createdAt": "2025-07-18T10:04:45.947Z",
    "updatedAt": "2025-07-18T10:04:45.947Z"
  },
  // Additional products for different categories
  {
    "_id": "book001",
    "title": "The Art of Programming",
    "price": 45.99,
    "originalPrice": 59.99,
    "discount": 23,
    "description": "A comprehensive guide to programming fundamentals",
    "features": [
      "500+ pages",
      "Code examples",
      "Beginner friendly"
    ],
    "image": "/assets/book1.jpg",
    "category": "books",
    "stock": 75,
    "rating": 4.8,
    "reviewCount": 234,
    "reviews": []
  },
  {
    "_id": "book002",
    "title": "JavaScript: The Complete Guide",
    "price": 39.99,
    "originalPrice": 49.99,
    "discount": 20,
    "description": "Master JavaScript from basics to advanced concepts",
    "features": [
      "ES6+ features",
      "Practical projects",
      "Online resources"
    ],
    "image": "/assets/book2.jpg",
    "category": "books",
    "stock": 60,
    "rating": 4.7,
    "reviewCount": 189,
    "reviews": []
  },
  {
    "_id": "mobile001",
    "title": "Smartphone Pro Max",
    "price": 999.99,
    "originalPrice": 1199.99,
    "discount": 17,
    "description": "Latest flagship smartphone with advanced features",
    "features": [
      "6.7-inch display",
      "Triple camera system",
      "5G connectivity",
      "All-day battery"
    ],
    "image": "/assets/phone1.jpg",
    "category": "mobiles",
    "stock": 40,
    "rating": 4.6,
    "reviewCount": 312,
    "reviews": []
  },
  {
    "_id": "mobile002",
    "title": "Budget Smartphone",
    "price": 299.99,
    "originalPrice": 399.99,
    "discount": 25,
    "description": "Affordable smartphone with essential features",
    "features": [
      "6.1-inch display",
      "Dual camera",
      "4G connectivity",
      "Long battery life"
    ],
    "image": "/assets/phone2.jpg",
    "category": "mobiles",
    "stock": 80,
    "rating": 4.2,
    "reviewCount": 156,
    "reviews": []
  },
  {
    "_id": "fashion001",
    "title": "Designer Jeans",
    "price": 89.99,
    "originalPrice": 129.99,
    "discount": 31,
    "description": "Premium quality designer jeans",
    "features": [
      "100% Cotton",
      "Slim fit",
      "Multiple sizes",
      "Durable fabric"
    ],
    "image": "/assets/jeans1.jpg",
    "category": "fashion",
    "stock": 120,
    "rating": 4.4,
    "reviewCount": 98,
    "reviews": []
  },
  {
    "_id": "fashion002",
    "title": "Casual Sneakers",
    "price": 79.99,
    "originalPrice": 99.99,
    "discount": 20,
    "description": "Comfortable casual sneakers for everyday wear",
    "features": [
      "Breathable material",
      "Cushioned sole",
      "Multiple colors",
      "Lightweight"
    ],
    "image": "/assets/sneakers1.jpg",
    "category": "fashion",
    "stock": 90,
    "rating": 4.5,
    "reviewCount": 167,
    "reviews": []
  },
  {
    "_id": "sports001",
    "title": "Professional Tennis Racket",
    "price": 159.99,
    "originalPrice": 199.99,
    "discount": 20,
    "description": "High-performance tennis racket for serious players",
    "features": [
      "Carbon fiber frame",
      "Perfect balance",
      "Professional grip",
      "Tournament approved"
    ],
    "image": "/assets/racket1.jpg",
    "category": "sports",
    "stock": 35,
    "rating": 4.7,
    "reviewCount": 89,
    "reviews": []
  },
  {
    "_id": "sports002",
    "title": "Yoga Mat Premium",
    "price": 49.99,
    "originalPrice": 69.99,
    "discount": 29,
    "description": "Premium yoga mat for comfortable practice",
    "features": [
      "Non-slip surface",
      "Eco-friendly material",
      "6mm thickness",
      "Carrying strap included"
    ],
    "image": "/assets/yogamat1.jpg",
    "category": "sports",
    "stock": 65,
    "rating": 4.6,
    "reviewCount": 143,
    "reviews": []
  }
];

// Utility functions
export const getProductById = (id) => {
  return products.find(product => product._id === id);
};

export const getRelatedProducts = (currentProductId, limit = 4) => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  // Get products from the same category, excluding the current product
  const relatedProducts = products
    .filter(product => 
      product._id !== currentProductId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
  
  // If not enough products in the same category, fill with other products
  if (relatedProducts.length < limit) {
    const otherProducts = products
      .filter(product => 
        product._id !== currentProductId && 
        product.category !== currentProduct.category
      )
      .slice(0, limit - relatedProducts.length);
    
    relatedProducts.push(...otherProducts);
  }
  
  return relatedProducts;
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export default products;