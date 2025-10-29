import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FindInPage as FindIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ variant = 'default', sx = {}, component, to, ...props }) => {
  const theme = useTheme();
  
  // Determine sizes based on variant
  const iconSize = variant === 'small' ? 20 : variant === 'large' ? 36 : 28;
  const fontSize = variant === 'small' ? 18 : variant === 'large' ? 30 : 24;
  
  const BoxComponent = component || Box;
  
  return (
    <BoxComponent 
      component={component === RouterLink ? undefined : component}
      to={to}
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        textDecoration: 'none',
        ...sx
      }}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: iconSize + 8,
          height: iconSize + 8,
          mr: 1,
          boxShadow: 2,
          transform: 'rotate(-10deg)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'rotate(0deg)',
          }
        }}
      >
        <FindIcon sx={{ fontSize: iconSize }} />
      </Box>
      <Typography
        variant={variant === 'small' ? 'h6' : variant === 'large' ? 'h4' : 'h5'}
        component="span"
        sx={{
          fontWeight: 'bold',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize,
          letterSpacing: '0.5px',
        }}
      >
        Findly
      </Typography>
    </BoxComponent>
  );
};

export default Logo; 