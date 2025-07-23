import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Chip
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const AdminPageHeader = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  actions = [], 
  stats = [] 
}) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => (
            <Link 
              key={index} 
              color="inherit" 
              href={crumb.href || '#'} 
              underline="hover"
              sx={{ 
                color: index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary',
                fontWeight: index === breadcrumbs.length - 1 ? 600 : 400
              }}
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      )}

      {/* Header Content */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {/* Action Buttons */}
        {actions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'contained'}
                color={action.color || 'primary'}
                startIcon={action.icon}
                onClick={action.onClick}
                size={action.size || 'medium'}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* Stats Chips */}
      {stats.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {stats.map((stat, index) => (
            <Chip
              key={index}
              label={`${stat.label}: ${stat.value}`}
              color={stat.color || 'default'}
              variant={stat.variant || 'outlined'}
              size="small"
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default AdminPageHeader;