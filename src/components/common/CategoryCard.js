import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryCard = ({ category }) => {
  return (
    <Link to={category.path} className="category-card">
      <div className="category-icon">
        <FontAwesomeIcon icon={category.icon} />
      </div>
      <h3>{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;