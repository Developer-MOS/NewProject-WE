import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEmail } from '../../context/EmailContext';

const EmailListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const EmailList = () => {

  const { emails, selectedEmail, setSelectedEmail } = useEmail();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        top: 58,
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
      }}
    >
      <List sx={{ p: 0 , paddingBottom : 20 }}>
        {emails.map((email) => (
          <Box key={email.id} >
            <EmailListItem
              selected={selectedEmail?.id === email.id}
              onClick={() => setSelectedEmail(email)}
              sx={{
                backgroundColor: !email.read ? '#f1f3f4' : 'transparent',
                padding:0,
                paddingX:1,
              }}
            >
              <ListItemAvatar>
                <Avatar>{email.sender[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: !email.read ? 600 : 400,
                        color: !email.read ? '#202124' : '#5f6368',
                      }}
                    >
                      {email.sender?.slice(0,15)}...
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {email.time}
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: !email.read ? 600 : 400,
                        color: !email.read ? '#202124' : '#5f6368',
                      }}
                    >
                      {email.subject?.slice(0,30)}..
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {email.preview}
                    </Typography>
                  </>
                }
              />
            </EmailListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default EmailList; 