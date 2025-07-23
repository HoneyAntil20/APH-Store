import React from 'react';
import CategoryPage from '../components/common/CategoryPage';
import products from '../data/products';

const MobilesPage = () => {
  // Filter products by mobiles category
  const mobileProducts = products.filter(product => product.category === 'mobiles');

  // Brand options
  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei'];

  return (
    <CategoryPage
      title="Mobiles"
      bannerImage="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
      products={mobileProducts}
      brands={brands}
      categoryPath="mobiles"
    />
  );
};

export default MobilesPage;