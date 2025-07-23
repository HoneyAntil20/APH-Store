import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

const AdminStatsCard = ({
  title,
  value,
  change,
  changeType = 'percentage', // 'percentage' or 'absolute'
  icon,
  color = 'primary',
  loading = false,
  progress,
  subtitle
}) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
  const trendColor = isPositive ? 'success' : 'error';

  return (
    <Card 
      elevation={1} 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          boxShadow: 2,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Loading...
                </Typography>
              </Box>
            ) : (
              <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                {value}
              </Typography>
            )}
            
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: `${color}.light`,
                color: `${color}.main`
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Progress Bar */}
        {progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={color}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        {/* Change Indicator */}
        {change !== undefined && !loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<TrendIcon />}
              label={`${isPositive ? '+' : ''}${change}${changeType === 'percentage' ? '%' : ''}`}
              color={trendColor}
              size="small"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminStatsCard;