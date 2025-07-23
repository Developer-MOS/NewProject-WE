import React from 'react';
import { Box, Typography } from '@mui/material';

const DailerPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '93vh',
      bgcolor: '#e3f2fd',
      borderRadius: 4
    }}
  >
    <Typography variant="h3" fontWeight={700} color="#1565c0" mb={2}>
      Dailer
    </Typography>
    <Typography variant="h6" color="#1976d2">
      This is the Dailer page.
    </Typography>
  </Box>
);

export default DailerPage; 