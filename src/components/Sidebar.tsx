import React from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  logoUrl?: string;
}

const navItems = [
  {
    label: 'Dashboard',
    icon: <SpaceDashboardOutlinedIcon sx={{ color: '#0d47a1' }} />, // Unique blue
    path: '/dashboard',
    color: '#c3e0fa',
  },
  {
    label: 'WATI',
    icon: <ChatBubbleOutlineIcon sx={{ color: '#1565c0' }} />, // Deep blue
    path: '/wati',
    color: '#e3f2fd',
  },
  {
    label: 'Email',
    icon: <EmailOutlinedIcon sx={{ color: '#1976d2' }} />, // Slightly lighter blue
    path: '/email',
    color: '#bbdefb',
  },
  {
    label: 'Dailer',
    icon: <DialpadOutlinedIcon sx={{ color: '#2196f3' }} />, // Vibrant blue
    path: '/dailer',
    color: '#90caf9',
  },
  {
    label: 'Statics',
    icon: <BarChartOutlinedIcon sx={{ color: '#0d47a1' }} />, // Navy blue
    path: '/statics',
    color: '#64b5f6',
  },
];

const drawerWidth = 80;
const expandedWidth = 220;

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          width: open ? expandedWidth : drawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxShadow: '2px 0 8px 0 rgba(21,101,192,0.04)',
          border: 'none',
          background: '#f5faff',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 1 }}>
        {open && (
          <img src="https://images.seeklogo.com/logo-png/38/1/company-logo-png_seeklogo-389186.png" alt="Logo" style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'cover', background: '#e3e3e3' }} />
        )}
        <IconButton onClick={() => setOpen(!open)} size="small" sx={{ color: '#1565c0', alignSelf: open ? 'flex-end' : 'center', mb: open ? 0 : 2 }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <Tooltip key={item.label} title={open ? '' : item.label} placement="right">
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={selected}
                  sx={{
                    borderRadius: '16px',
                    mx: 1,
                    background: selected ? item.color : 'transparent',
                    minHeight: 48,
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: item.color,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: selected ? 700 : 500,
                        color: selected ? '#0d47a1' : '#1565c0',
                        fontSize: 16,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar; 