import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  companyName: string;
  logoUrl?: string;
  children: React.ReactNode;
}

const drawerWidth = 80;
const expandedWidth = 220;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#f5faff' }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Box
        sx={{
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ml: sidebarOpen ? `${expandedWidth}px` : `${drawerWidth}px`,
          p: { xs: 1, sm: 1 },
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 