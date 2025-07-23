import React from 'react';
import CategoryPage from '../components/common/CategoryPage';
import products from '../data/products';

const BooksPage = () => {
  // Filter products by books category
  const booksProducts = products.filter(product => product.category === 'books');

  // Brand/Category options
  const brands = ['Fiction', 'Non-Fiction', 'Academic', 'Children', 'Business', 'Self-Help'];

  return (
    <CategoryPage
      title="Books"
      bannerImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
      products={booksProducts}
      brands={brands}
      categoryPath="books"
    />
  );
};

export default BooksPage;