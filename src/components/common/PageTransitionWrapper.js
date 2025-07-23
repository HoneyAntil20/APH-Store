import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/PageTransitions.css';

/**
 * A wrapper component that provides smooth page transitions
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);
  
  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };
  
  return (
    <div 
      className={`page-transition-wrapper ${transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default PageTransitionWrapper;