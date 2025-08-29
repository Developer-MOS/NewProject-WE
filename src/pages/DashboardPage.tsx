import React from 'react';
import { Box, Typography } from '@mui/material';
import EmailList from '../email/Components/EmailList';
import LeftMenu from '../wati/Pages/LeftMenu';
import { WatiProvider } from '../context/WatiContext';
import { useWati } from '../context/WatiContext.types';
import { useEmail } from '../context/EmailContext';
import DailerPage from './DailerPage';

// Animated loader using CSS keyframes (spinner)
const AnimatedLoading = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
    <Box
      sx={{
        width: 60,
        height: 60,
        position: 'relative',
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          border: '6px solid #90caf9',
          borderTop: '6px solid #1976d2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 14,
          left: 14,
          width: 32,
          height: 32,
          border: '4px solid #e3f2fd',
          borderTop: '4px solid #1976d2',
          borderRadius: '50%',
          animation: 'spinReverse 1.2s linear infinite',
          '@keyframes spinReverse': {
            '0%': { transform: 'rotate(360deg)' },
            '100%': { transform: 'rotate(0deg)' },
          },
        }}
      />
    </Box>
    <Typography variant="subtitle1" color="primary" mt={2} fontWeight={500}>Loading...</Typography>
  </Box>
);

// Bouncing dots loader for Email section
const BouncingDotsLoading = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#1976d2',
            animation: `bounce 1s ${i * 0.2}s infinite cubic-bezier(.36,.07,.19,.97)`,
            '@keyframes bounce': {
              '0%, 80%, 100%': { transform: 'scale(0.7)', opacity: 0.6 },
              '40%': { transform: 'scale(1.2)', opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
    <Typography variant="subtitle1" color="primary" mt={2} fontWeight={500}>Loading emails...</Typography>
  </Box>
);

const ErrorState = ({ message }: { message: string }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="28" stroke="#e57373" strokeWidth="4" fill="none" />
      <line x1="20" y1="20" x2="40" y2="40" stroke="#e57373" strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="20" x2="20" y2="40" stroke="#e57373" strokeWidth="4" strokeLinecap="round" />
    </svg>
    <Typography variant="subtitle1" color="error" mt={2} fontWeight={500}>{message}</Typography>
  </Box>
);

const WatiDemo = () => {
  // Must be inside WatiProvider
  const { loading, chatLists } = useWati();
  if (loading) return <AnimatedLoading />;
  if (!chatLists.length) return <Typography color="text.secondary">No Wati contacts found.</Typography>;
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <LeftMenu />
    </Box>
  );
};

const DailerDemo = () => (
  <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* <Typography variant="h4" color="#0d47a1" mb={1}>Dailer</Typography> */}
    {/* <Typography variant="body1" color="#1976d2"> Dailer section. </Typography> */}
    {/* <DailerPage /> */}

    <iframe
      src='http://192.168.100.205'
      title='Dailer'
      width={'100%'}
      height={'100%'}
      style={{ border:'none'}}
    />

  </Box>
);

const EmailDemo = () => {
  const { isLoading, authError, emails } = useEmail();
  if (isLoading) return <BouncingDotsLoading />;
  if (authError) return <ErrorState message={authError} />;
  if (!emails.length) return <Typography color="text.secondary">No emails found.</Typography>;
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <EmailList />
    </Box>
  );
};

const DashboardPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      width: '100%',
      height: { xs: 'auto', md: '98vh' },
      bgcolor: '#f8fafc',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap:1,
      padding:0.3
    }}
  >
    {[() => <WatiProvider><WatiDemo /></WatiProvider>, DailerDemo, EmailDemo].map((Component, idx) => (
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