import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling page transitions with loading state
 * @returns {Object} - Object containing loading state and transition functions
 */
const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle page transition with a callback
   * @param {Function} callback - Function to execute during transition
   * @param {number} delay - Delay in milliseconds before executing callback
   */
  const handleTransition = (callback, delay = 300) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      // Keep loading state for a bit to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, delay);
  };

  /**
   * Navigate to a new route with transition
   * @param {string} path - Path to navigate to
   * @param {number} delay - Delay in milliseconds before navigation
   */
  const navigateWithTransition = (path, delay = 300) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      // Keep loading state for a bit to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, delay);
  };

  return {
    isLoading,
    handleTransition,
    navigateWithTransition
  };
};

export default usePageTransition;