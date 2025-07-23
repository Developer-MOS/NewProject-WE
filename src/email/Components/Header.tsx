import {
  IconButton,
  InputBase,
  Avatar,
  Box,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
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

const Header = ({ isSidebarOpen, onMenuClick }: HeaderProps) => {
  return (
    <Box
      sx={{
        // width: '100%',
        backgroundColor: '#ffffff',
        color: '#202124',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
        display: 'flex',
        alignItems: 'center',
        minHeight: '64px',
        px: 3,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onMenuClick}
        sx={{
          mr: 2,
          color: '#5f6368',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            backgroundColor: 'rgba(60,64,67,0.08)',
          },
        }}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
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
    </Box>
  );
};

export default Header; 