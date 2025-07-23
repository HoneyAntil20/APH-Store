import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Custom styled MUI buttons
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3498db',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  textTransform: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  boxShadow: 'none',
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#3498db',
  border: '1px solid #3498db',
  '&:hover': {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  textTransform: 'none',
  borderRadius: '4px',
  padding: '9px 19px',
}));

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e74c3c',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c0392b',
  },
  textTransform: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  boxShadow: 'none',
}));

const SuccessButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2ecc71',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#27ae60',
  },
  textTransform: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  boxShadow: 'none',
}));

const MuiButton = ({ 
  variant = 'primary', 
  children, 
  startIcon, 
  endIcon, 
  fullWidth = false,
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const getButtonComponent = () => {
    switch (variant) {
      case 'secondary':
        return SecondaryButton;
      case 'danger':
        return DangerButton;
      case 'success':
        return SuccessButton;
      case 'primary':
      default:
        return PrimaryButton;
    }
  };

  const ButtonComponent = getButtonComponent();

  return (
    <ButtonComponent
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export default MuiButton;