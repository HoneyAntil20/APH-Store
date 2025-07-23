import React from 'react';
import CategoryPage from '../components/common/CategoryPage';
import products from '../data/products';

const ElectronicsPage = () => {
  // Filter products by electronics category
  const electronicsProducts = products.filter(product => product.category === 'electronics');

  // Brand options
  const brands = ['Apple', 'Samsung', 'Sony', 'Bose', 'Logitech', 'JBL'];

  return (
    <CategoryPage
      title="Electronics"
      bannerImage="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
      products={electronicsProducts}
      brands={brands}
      categoryPath="electronics"
    />
  );
};

export default ElectronicsPage;