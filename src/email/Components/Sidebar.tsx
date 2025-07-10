import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Divider,
  alpha,
  Badge,
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Star as StarIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Delete as DeleteIcon,
  Label as LabelIcon,
  Schedule as ScheduleIcon,
  PriorityHigh as PriorityHighIcon,
  Chat as ChatIcon,
  Snooze as SnoozeIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
// import ComposeEmail from './ComposeEmail';
import { useEmail } from '../../context/EmailContext';

// const drawerWidth = 256;

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: drawerWidth,
//     top:64,
//     boxSizing: 'border-box',
//     border: 'none',
//     backgroundColor: theme.palette.background.default,
//     boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
//   },
// }));

const ComposeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
  },
  transition: 'all 0.2s ease-in-out',
}));

interface SidebarProps {
  open: boolean;
}

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ open }) => ({
  width: '256px',
  height: '100%',
  position:'relative',
  top:58,
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  opacity: open ? 1 : 0,
  overflowY:'scroll',
}));

const Sidebar = ({ open }: SidebarProps) => {


  const { setShowCompose } = useEmail();

  const primaryMenuItems = [
    { text: 'Inbox', icon: <InboxIcon />, count: 125, selected: true },
    { text: 'Starred', icon: <StarIcon /> },
    { text: 'Snoozed', icon: <SnoozeIcon /> },
    { text: 'Important', icon: <PriorityHighIcon /> },
    { text: 'Sent', icon: <SendIcon /> },
    { text: 'Drafts', icon: <DraftsIcon />, count: 3 },
    { text: 'Chats', icon: <ChatIcon /> },
    { text: 'Scheduled', icon: <ScheduleIcon /> },
    { text: 'Trash', icon: <DeleteIcon /> },
    { text: 'Spam', icon: <ReportIcon /> },
  ];

  const labelMenuItems = [
    { text: 'Work', color: '#4285f4' },
    { text: 'Personal', color: '#ea4335' },
    { text: 'Travel', color: '#fbbc04' },
    { text: 'Finance', color: '#34a853' },
  ];

  return (
    <SidebarContainer open={open}>
      <Box sx={{ p: 2 }}>
        <ComposeButton
          variant="contained"
          startIcon={<DriveFileRenameOutlineRoundedIcon />}
          fullWidth
          onClick={() => setShowCompose(true)}
          sx={{
            borderRadius: '24px',
            textTransform: 'none',
            justifyContent: 'flex-start',
            py: 1.5,
          }}
        >
          Compose
        </ComposeButton>
      </Box>
      <Divider />
      <List>
        {primaryMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={item.selected}
              sx={{
                borderRadius: '0 16px 16px 0',
                mr: 1,
                my: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(60,64,67,0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: alpha('#e8f0fe', 0.8),
                  '&:hover': {
                    backgroundColor: alpha('#e8f0fe', 0.9),
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: 500,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  sx: { fontWeight: 400 },
                }}
              />
              {item.count && (
                <Badge
                  badgeContent={item.count}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: item.selected ? 'primary.main' : 'text.secondary',
                      color: item.selected ? 'white' : 'inherit',
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: '0 16px 16px 0',
              mr: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(60,64,67,0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Labels" 
              primaryTypographyProps={{
                sx: { fontWeight: 400 },
              }}
            />
          </ListItemButton>
        </ListItem>
        {labelMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: '0 16px 16px 0',
                mr: 1,
                my: 0.5,
                pl: 4,
                '&:hover': {
                  backgroundColor: 'rgba(60,64,67,0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  mr: 2,
                }}
              />
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  sx: { fontWeight: 400 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar; 