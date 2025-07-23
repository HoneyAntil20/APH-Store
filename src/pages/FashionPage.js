import React from 'react';
import CategoryPage from '../components/common/CategoryPage';
import products from '../data/products';

const FashionPage = () => {
  // Filter products by fashion category
  const fashionProducts = products.filter(product => product.category === 'fashion');

  // Brand/Category options
  const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levis'];

  return (
    <CategoryPage
      title="Fashion"
      bannerImage="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
      products={fashionProducts}
      brands={brands}
      categoryPath="fashion"
    />
  );
};

export default FashionPage;