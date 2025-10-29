import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TestApp = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        🎉 Findly App is Working!
      </Typography>
      <Typography variant="h6" paragraph>
        If you can see this, the React app is loading correctly.
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Test Button
      </Button>
    </Box>
  );
};

export default TestApp;

