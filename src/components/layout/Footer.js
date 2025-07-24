import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Shop Categories</h3>
            <ul>
              <li><Link to="/electronics">Electronics</Link></li>
              <li><Link to="/fashion">Fashion</Link></li>
              <li><Link to="/mobiles">Mobiles</Link></li>
              <li><Link to="/sports">Sports</Link></li>
              <li><Link to="/books">Books</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>My Account</h3>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/orders">Order History</Link></li>
            </ul>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} APH Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
