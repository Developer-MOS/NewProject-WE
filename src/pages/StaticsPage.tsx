import React from 'react';
import { Box, Typography } from '@mui/material';

const StaticsPage: React.FC = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '93vh', 
      bgcolor: '#bbdefb', 
      borderRadius: 4 
    }}>
    <Typography variant="h3" fontWeight={700} color="#0d47a1" mb={2}>
      Statics
    </Typography>
    <Typography variant="h6" color="#1976d2">
      This is the Statics page
    </Typography>
  </Box>
);

export default StaticsPage; 