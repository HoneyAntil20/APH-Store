import React from 'react';
import CategoryPage from '../components/common/CategoryPage';
import products from '../data/products';

const SportsPage = () => {
  // Filter products by sports category
  const sportsProducts = products.filter(product => product.category === 'sports');

  // Brand/Category options
  const brands = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok', 'New Balance'];

  return (
    <CategoryPage
      title="Sports & Fitness"
      bannerImage="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
      products={sportsProducts}
      brands={brands}
      categoryPath="sports"
    />
  );
};

export default SportsPage;