import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/common/ProductCard';

const HomeCategoryPage = () => {
  // Sample products data
  const products = [
    {
      id: 501,
      title: 'Modern Coffee Table',
      price: 149.99,
      originalPrice: 199.99,
      discount: '25',
      rating: 4.6,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 502,
      title: 'Bedside Lamp',
      price: 39.99,
      rating: 4.3,
      reviewCount: 85,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 503,
      title: 'Decorative Cushion Set',
      price: 29.99,
      originalPrice: 39.99,
      discount: '25',
      rating: 4.5,
      reviewCount: 150,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 504,
      title: 'Kitchen Utensil Set',
      price: 49.99,
      rating: 4.7,
      reviewCount: 95,
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 505,
      title: 'Bathroom Organizer',
      price: 24.99,
      originalPrice: 34.99,
      discount: '30',
      rating: 4.2,
      reviewCount: 110,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 506,
      title: 'Wall Art Canvas',
      price: 59.99,
      rating: 4.4,
      reviewCount: 75,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 507,
      title: 'Indoor Plant Pot',
      price: 19.99,
      originalPrice: 24.99,
      discount: '20',
      rating: 4.3,
      reviewCount: 130,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 508,
      title: 'Scented Candle Set',
      price: 34.99,
      rating: 4.8,
      reviewCount: 180,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('featured');

  // Category options
  const categories = ['Furniture', 'Decor', 'Kitchen', 'Bathroom', 'Bedroom', 'Lighting'];

  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle price range change
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange({ ...priceRange, [type]: value });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <Layout>
      {/* Category Banner */}
      <div className="category-banner">
        <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80" alt="Home" />
        <div className="category-banner-content">
          <h1>Home & Living</h1>
          <p>Discover beautiful products to make your home more comfortable and stylish</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} /> <span>Home & Living</span>
      </div>

      {/* Product Container */}
      <div className="product-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input 
                type="number" 
                placeholder="Min" 
                value={priceRange.min} 
                onChange={(e) => handlePriceChange(e, 'min')} 
              />
              <span>to</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={priceRange.max} 
                onChange={(e) => handlePriceChange(e, 'max')} 
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map((category, index) => (
                <label key={index}>
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(category)} 
                    onChange={() => handleCategoryChange(category)} 
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Material</h3>
            <div className="filter-options">
              <label>
                <input type="checkbox" /> Wood
              </label>
              <label>
                <input type="checkbox" /> Metal
              </label>
              <label>
                <input type="checkbox" /> Glass
              </label>
              <label>
                <input type="checkbox" /> Plastic
              </label>
              <label>
                <input type="checkbox" /> Fabric
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Color</h3>
            <div className="color-options">
              <div className="color-option" style={{ backgroundColor: 'black' }} title="Black"></div>
              <div className="color-option" style={{ backgroundColor: 'white', border: '1px solid #ddd' }} title="White"></div>
              <div className="color-option" style={{ backgroundColor: 'brown' }} title="Brown"></div>
              <div className="color-option" style={{ backgroundColor: 'gray' }} title="Gray"></div>
              <div className="color-option" style={{ backgroundColor: 'beige' }} title="Beige"></div>
              <div className="color-option" style={{ backgroundColor: 'blue' }} title="Blue"></div>
              <div className="color-option" style={{ backgroundColor: 'green' }} title="Green"></div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Discount</h3>
            <div className="filter-options">
              <label>
                <input type="checkbox" /> 50% or more
              </label>
              <label>
                <input type="checkbox" /> 40% or more
              </label>
              <label>
                <input type="checkbox" /> 30% or more
              </label>
              <label>
                <input type="checkbox" /> 20% or more
              </label>
              <label>
                <input type="checkbox" /> 10% or more
              </label>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="sort-options">
            <span>Sort By:</span>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <a href="#" className="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#" className="next">Next</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCategoryPage;