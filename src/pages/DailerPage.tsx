import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, useTheme, Button, Stack, Chip } from '@mui/material';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import HistoryIcon from '@mui/icons-material/History';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';

// Mock data
const incomingCall = {
  number: '+91 9876543210',
  time: '09:30 AM',
  name: 'Ravi Kumar',
  avatar: '', // Could be a URL or empty for initials
};

const callHistory = [
  { number: '+91 9123456789', time: 'Yesterday', name: 'Priya Singh' },
  { number: '+91 9988776655', time: '2 days ago', name: 'Amit Sharma' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
  { number: '+91 9001122334', time: '3 days ago', name: 'Sita Devi' },
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const IncomingCall: React.FC<{ onAnswer: () => void; onDecline: () => void; }> = ({ onAnswer, onDecline }) => {
  const theme = useTheme();
  const [callStatus, setCallStatus] = useState<'ringing' | 'in-call'>('ringing');
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate answering the call after 2 seconds for demo
  useEffect(() => {
    if (callStatus === 'in-call') {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      setSeconds(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callStatus]);

  const handleAnswer = () => {
    setCallStatus('in-call');
    onAnswer();
  };
  const handleDecline = () => {
    setCallStatus('ringing');
    setSeconds(0);
    onDecline();
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <Paper elevation={4} sx={{
      // p: { xs: 2, sm: 3 },
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#e8f5e9',
      width: '100%',
      height: '100%',
      boxShadow: '0 8px 32px 0 rgba(67,160,71,0.13)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 8, bgcolor: callStatus === 'in-call' ? '#43a047' : '#1976d2', opacity: 0.18 }} /> */}
      {/* <Avatar
        src={incomingCall.avatar}
        sx={{ bgcolor: '#1976d2', width: 72, height: 72, mb: 1, fontSize: 36, boxShadow: '0 2px 12px 0 #1976d2' }}
      >
        {incomingCall.avatar ? null : <PersonIcon fontSize="large" />}
        {!incomingCall.avatar && getInitials(incomingCall.name)}
      </Avatar> */}
      <Avatar sx={{ bgcolor: '#43a047', width: 64, height: 64, mb: 1 }}>
        <CallReceivedIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6" fontWeight={700} color="text.primary" align="center">
        {incomingCall.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight={500} align="center">
        {incomingCall.number}
      </Typography>
      <Chip
        label={callStatus === 'in-call' ? `In Call • ${formatTime(seconds)}` : 'Ringing...'}
        color={callStatus === 'in-call' ? 'success' : 'primary'}
        sx={{ mt: 1, fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {incomingCall.time}
      </Typography>
      <Stack direction="row" spacing={3} mt={2}>
        {callStatus === 'ringing' ? (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={<CallIcon />}
              onClick={handleAnswer}
              sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
            >
              Answer
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndIcon />}
              onClick={handleDecline}
              sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
            >
              Decline
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="error"
            startIcon={<CallEndIcon />}
            onClick={handleDecline}
            sx={{ minWidth: 180, fontWeight: 600, fontSize: 16 }}
          >
            End Call
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

const CallHistory: React.FC = () => {
  const theme = useTheme();
  return (
    <Paper elevation={2} sx={{
      p: 2,
      borderRadius: 3,
      bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#f5f7fa',
      height: '100%',
      mt: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <HistoryIcon sx={{ color: '#1976d2', mr: 1 }} />
        <Typography variant="subtitle1" fontWeight={600} color="primary">
          Call History
        </Typography>
      </Box>
      <List dense sx={{ flex: 1 }}>
        {callHistory.map((call, idx) => (
          <ListItem key={idx} sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: '#e3f2fd' } }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                <CallReceivedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<span style={{ fontWeight: 500 }}>{call.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>({call.number})</span></span>}
              secondary={call.time}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const DailerPage: React.FC = () => {
  const handleAnswer = () => {
    // alert('Call answered!');
  };
  const handleDecline = () => {
    // alert('Call declined!');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 1,
        height: '100%',
        borderRadius: 4,
        maxWidth: 500,
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <IncomingCall onAnswer={handleAnswer} onDecline={handleDecline} />
      </Box>
      <Box sx={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CallHistory />
      </Box>
    </Box>
  );
};

export default DailerPage;