import { useState, useEffect } from 'react';
import productService from '../services/productService';

/**
 * Custom hook for managing products data from the API
 */
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    totalProducts: 0
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProducts(filters);
      
      if (response.success) {
        setProducts(response.data.products || []);
        setPagination({
          page: response.data.page || 1,
          pages: response.data.pages || 1,
          totalProducts: response.data.totalProducts || 0
        });
      } else {
        throw new Error(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      // Fallback to empty array on error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.page, filters.category, filters.keyword]);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    pagination,
    refetch
  };
};

/**
 * Hook for getting a single product by ID
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getProductById(id);
        
        if (response.success) {
          setProduct(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch product');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

/**
 * Hook for getting top products
 */
export const useTopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getTopProducts();
        
        if (response.success) {
          setProducts(response.data || []);
        } else {
          throw new Error(response.error || 'Failed to fetch top products');
        }
      } catch (err) {
        console.error('Error fetching top products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return { products, loading, error };
};

/**
 * Hook for getting products by category
 */
export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getProductsByCategory(category);
        
        if (response.success) {
          setProducts(response.data || []);
        } else {
          throw new Error(response.error || 'Failed to fetch products by category');
        }
      } catch (err) {
        console.error('Error fetching products by category:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return { products, loading, error };
};