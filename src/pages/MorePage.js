import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faGamepad, 
  faUtensils, 
  faBaby, 
  faCar, 
  faTools, 
  faGift, 
  faMusic, 
  faPlane, 
  faHeartbeat, 
  faPalette, 
  faPaw, 
  faGraduationCap 
} from '@fortawesome/free-solid-svg-icons';

const MorePage = () => {
  // Categories data
  const categories = [
    {
      name: 'Toys & Games',
      icon: faGamepad,
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Fun for all ages'
    },
    {
      name: 'Food & Grocery',
      icon: faUtensils,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Fresh and pantry essentials'
    },
    {
      name: 'Baby Products',
      icon: faBaby,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Everything for your little ones'
    },
    {
      name: 'Automotive',
      icon: faCar,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Car accessories and parts'
    },
    {
      name: 'Tools & Home Improvement',
      icon: faTools,
      image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'DIY and professional tools'
    },
    {
      name: 'Gift Cards',
      icon: faGift,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'The perfect gift for anyone'
    },
    {
      name: 'Musical Instruments',
      icon: faMusic,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Find your sound'
    },
    {
      name: 'Travel & Luggage',
      icon: faPlane,
      image: 'https://images.unsplash.com/photo-1565431228183-d8044cecb85f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Travel essentials'
    },
    {
      name: 'Health & Personal Care',
      icon: faHeartbeat,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Wellness and beauty products'
    },
    {
      name: 'Arts & Crafts',
      icon: faPalette,
      image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Supplies for creativity'
    },
    {
      name: 'Pet Supplies',
      icon: faPaw,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Everything for your pets'
    },
    {
      name: 'Educational Supplies',
      icon: faGraduationCap,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      description: 'Learning materials for all ages'
    }
  ];

  return (
    <Layout>
      {/* Page Header */}
      <div className="page-header">
        <h1>More Categories</h1>
        <p>Explore all our product categories</p>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} /> <span>More Categories</span>
      </div>

      {/* Categories Grid */}
      <div className="more-categories">
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} className="category-img" />
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Promotions */}
      <section className="featured-promotions">
        <h2 className="section-title">Featured Promotions</h2>
        <div className="promotions-grid">
          <div className="promotion-card">
            <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80" alt="Special Offer" />
            <div className="promotion-content">
              <h3>Special Offer</h3>
              <p>Get up to 50% off on selected items</p>
              <Link to="/" className="btn">Shop Now</Link>
            </div>
          </div>
          <div className="promotion-card">
            <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80" alt="New Arrivals" />
            <div className="promotion-content">
              <h3>New Arrivals</h3>
              <p>Check out our latest products</p>
              <Link to="/" className="btn">Explore</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MorePage;