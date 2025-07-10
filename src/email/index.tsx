import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useEmail } from '../context/EmailContext';
import GmailLayout from './Components/GmailLayout';

const EmailApp = () => {

  const { isAuthenticated, isLoading, handleLogin } = useEmail();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height:'100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#f6f8fc',
          overflowY: 'none',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" color="text.secondary">
          Loading your Gmail...
        </Typography>
      </Box>
    );
  }

  // if (error) {
  //   return (
  //     <Box
  //       sx={{
  //         height: '100vh',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         backgroundColor: '#f6f8fc',
  //         gap: 2,
  //         p: 3,
  //       }}
  //     >
  //       <Typography variant="h6" color="error" align="center">
  //         {error}
  //       </Typography>
  //       <Button
  //         variant="contained"
  //         onClick={handleLogin}
  //         sx={{
  //           backgroundColor: '#1a73e8',
  //           '&:hover': {
  //             backgroundColor: '#1557b0',
  //           },
  //         }}
  //       >
  //         Try Again
  //       </Button>
  //     </Box>
  //   );
  // }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          height:'100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f6f8fc',
          overflow:'none',
          gap: 3,
        }}
      >
        <Box
          component="img"
          src="./email.png"
          alt="Gmail Logo"
          sx={{ width: 96, height: 96 }}
        />
        <Typography variant="h4" color="text.primary" align="center">
          Welcome to Mail
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400 }}>
          Sign in to access your emails and stay connected with your important conversations.
        </Typography>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#1a73e8',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#1557b0',
            },
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    );
  }

  return <GmailLayout />;
};

export default EmailApp; 