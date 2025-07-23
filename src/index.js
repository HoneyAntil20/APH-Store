import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import registrationsData from './data/registrations.json';

// Initialize registrations.json data in localStorage if not already present
if (!localStorage.getItem('registrationsJson')) {
  localStorage.setItem('registrationsJson', JSON.stringify(registrationsData));
  console.log('Initialized registrations.json data in localStorage');
}

// Add a small delay before rendering to ensure smooth transitions
// This helps prevent the white flash during page transitions
setTimeout(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Remove the initial loader once React is mounted
  const initialLoader = document.querySelector('.initial-loader');
  if (initialLoader) {
    initialLoader.style.opacity = '0';
    initialLoader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      initialLoader.style.display = 'none';
    }, 500);
  }
}, 300);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
