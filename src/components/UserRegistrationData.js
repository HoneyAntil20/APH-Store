import React, { useState, useEffect } from 'react';
import { getRegistrationsJsonFile } from '../utils/fileUtils';

/**
 * Component to display user registration data from registrations.json
 */
const UserRegistrationData = ({ userEmail }) => {
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        setLoading(true);
        // Get registrations data
        const data = await getRegistrationsJsonFile();
        
        if (data && data.registrations) {
          // Find the registration for the current user
          const userRegistration = data.registrations.find(
            reg => reg.email === userEmail
          );
          
          if (userRegistration) {
            setRegistrationData(userRegistration);
          } else {
            console.log('No registration found for this user in registrations.json');
          }
        }
      } catch (err) {
        console.error('Error fetching registration data:', err);
        setError('Failed to load registration data');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchRegistrationData();
    }
  }, [userEmail]);

  if (loading) {
    return <div className="loading-data">Loading registration data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!registrationData) {
    return (
      <div className="registration-data-section">
        <h3>Registration Data</h3>
        <p>No registration data found in registrations.json for this user.</p>
      </div>
    );
  }

  return (
    <div className="registration-data-section">
      <h3>Registration Data (from registrations.json)</h3>
      <div className="registration-data-card">
        <div className="info-item">
          <strong>ID:</strong>
          <span>{registrationData.id}</span>
        </div>
        <div className="info-item">
          <strong>Name:</strong>
          <span>{registrationData.name}</span>
        </div>
        <div className="info-item">
          <strong>Email:</strong>
          <span>{registrationData.email}</span>
        </div>
        <div className="info-item">
          <strong>Phone:</strong>
          <span>{registrationData.phoneNumber}</span>
        </div>
        <div className="info-item">
          <strong>Registration Date:</strong>
          <span>{new Date(registrationData.registrationDate).toLocaleString()}</span>
        </div>
        <div className="info-item">
          <strong>Status:</strong>
          <span>{registrationData.status}</span>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationData;