import React from 'react';
import { Box, Typography } from '@mui/material';
import EmailList from '../email/Components/EmailList';
import LeftMenu from '../wati/Pages/LeftMenu';

const WatiDemo = () => (
  <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* <Typography variant="h4" color="#0d47a1" mb={1}>Wati</Typography> */}
    {/* <Typography variant="body1" color="#1976d2"> Wati section. </Typography> */}
    <LeftMenu />
  
  </Box>
);

const DailerDemo = () => (
  <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4" color="#0d47a1" mb={1}>Dailer</Typography>
    <Typography variant="body1" color="#1976d2"> Dailer section. </Typography>
  </Box>
);

const EmailDemo = () => (
  <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* <Typography variant="h4" color="#0d47a1" mb={1}>Email Demo</Typography> */}
    {/* <Typography variant="body1" color="#1976d2">This is a demo for the Email section.</Typography> */}
    <EmailList />
  </Box>
);

const DashboardPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      width: '100%',
      height: { xs: 'auto', md: '98vh' },
      // minHeight: '70vh',
      bgcolor: '#f8fafc',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap:1,
      padding:0.3
      // gap: { xs: 3, md: 5 },
      // px: { xs: 1, md: 6 },
      // py: { xs: 3, md: 6 },
    }}
  >
    {[WatiDemo, DailerDemo, EmailDemo].map((Component, idx) => (
      <Box
        key={idx}
        sx={{
          flex: 1,
          minWidth: 0,
          background: '#fff',
          border: '1.5px solid #d1d9e6',
          borderRadius: 1,
          boxShadow: '0 2px 16px 0 rgba(21,101,192,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s, border-color 0.2s',
          '&:hover': {
            boxShadow: '0 6px 32px 0 rgba(21,101,192,0.13)',
            borderColor: '#90caf9',
          },
        }}
      >
        <Component />
      </Box>
    ))}
  </Box>
);

export default DashboardPage; 