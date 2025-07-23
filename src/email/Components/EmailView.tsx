import { Box, Typography, Avatar, Divider, IconButton, Tooltip } from '@mui/material';
import {
  Reply as ReplyIcon,
  ReplyAll as ReplyAllIcon,
  Forward as ForwardIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useEmail } from '../../context/EmailContext';

const EmailView = () => {

  const { selectedEmail } = useEmail();

  if (!selectedEmail) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          height: '85vh'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Please select an email to read.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        // height: '100%',
        height: '78vh',
        width: '100%',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>{selectedEmail.sender[0]}</Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: '#202124', fontWeight: 500 }}>
              {selectedEmail.subject}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#202124' }}>
                {selectedEmail.sender}
              </Typography>
              <Typography variant="body2" sx={{ color: '#5f6368' }}>
                {selectedEmail.time}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Reply">
            <IconButton size="small" sx={{ color: '#5f6368' }}>
              <ReplyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply all">
            <IconButton size="small" sx={{ color: '#5f6368' }}>
              <ReplyAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Forward">
            <IconButton size="small" sx={{ color: '#5f6368' }}>
              <ForwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More">
            <IconButton size="small" sx={{ color: '#5f6368' }}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Typography
        variant="body1"
        sx={{
          color: '#202124',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.5,
        }}
      >
        {selectedEmail.body}
      </Typography>
    </Box>
  );
};

export default EmailView; 