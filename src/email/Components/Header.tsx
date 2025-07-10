import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Badge,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: alpha(theme.palette.grey[100], 0.9),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'all 0.2s ease-in-out',
  '&:focus-within': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[600],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    '&::placeholder': {
      color: theme.palette.grey[600],
      opacity: 1,
    },
  },
}));

interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#202124',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            color: '#5f6368',
            '&:hover': {
              backgroundColor: 'rgba(60,64,67,0.08)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          src="/email.png"
          alt="Gmail"
          sx={{
            height: 40,
            mr: 2,
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search mail"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                color: '#5f6368',
                '&:hover': {
                  backgroundColor: 'rgba(60,64,67,0.08)',
                },
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              sx={{
                color: '#5f6368',
                '&:hover': {
                  backgroundColor: 'rgba(60,64,67,0.08)',
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Google Account">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                cursor: 'pointer',
                ml: 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              alt="User"
              src="/avatar.jpg"
            />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 