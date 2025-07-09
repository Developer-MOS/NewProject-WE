import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container } from '@mui/material';

interface LayoutProps {
  companyName: string;
  logoUrl?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ companyName, logoUrl, children }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
        <Toolbar>
          <Avatar src={logoUrl} sx={{ width: 40, height: 40, bgcolor: '#e3e3e3', mr: 2 }} />
          <Typography variant="h6" fontWeight={700} color="primary" sx={{ flexGrow: 1 }}>
            {companyName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 